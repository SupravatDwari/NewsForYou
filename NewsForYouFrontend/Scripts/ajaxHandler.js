baseurl = "https://localhost:7235/api/"
function makeGetRequest(apiname, payload, successFunction, errorFunction, addAuthorization = false) {
    var url = baseurl + apiname;

    // Append payload to URL if it exists
    if (payload) {
        url += '?' + $.param(payload);
    }

    var headers = {};
    if (addAuthorization) {
        var token = sessionStorage.getItem('credential');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        else {
            document.cookie = "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "login.html";
        }
    }

    $.ajax({
        url: url,
        type: 'GET',
        headers: headers,
        success: function (result) {
            console.log(result);
            if (typeof successFunction === 'function') {
                successFunction(result);
            }
        },
        error: function (e) {
            if (typeof errorFunction === 'function') {
                errorFunction(e);
            }
        }
    });
}


makePostRequest = (apiname, payload, successFunction, errorFunction, addAuthorization = false) => {
    var requestData = {
        url: baseurl + apiname,
        type: 'POST',
        success: function (result) {
            successFunction(result);
        },
        error: function (e) {
            errorFunction(e);
        }
    };

    if (payload) {
        requestData.contentType = 'application/json'; // Specify JSON content type
        requestData.data = JSON.stringify(payload); // Convert payload to JSON string
    }

    var headers = {};
    if (addAuthorization) {
        var token = sessionStorage.getItem('credential');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        else {
            document.cookie = "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "login.html";
        }
    }

    // Add headers to the requestData object
    requestData.headers = headers;

    $.ajax(requestData);
}


makeDeleteRequest = (apiname, payload, successFunction, errorFunction, addAuthorization = false) => {
    var requestData = {
        url: baseurl + apiname,
        type: 'DELETE',
        success: function (result) {
            successFunction(result);
        },
        error: function (e) {
            errorFunction(e);
        }
    };

    if (payload) {
        requestData.contentType = 'application/json'; // Specify JSON content type
        requestData.data = JSON.stringify(payload); // Convert payload to JSON string
    }

    if (addAuthorization) {
        var token = sessionStorage.getItem('credential');
        if (token) {
            requestData.headers = {
                'Authorization': 'Bearer ' + token
            };
        }
        else {
            document.cookie = "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "login.html";
        }
    }

    $.ajax(requestData);
}
