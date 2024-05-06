$(document).ready(function () {
    $('#navbar').load('Navbar.html');
    if (!isAdmin()) {
        window.location.href = "login.html";
    }
    makeGetRequest('category', null, loadAllData.bind(null, 'feedcategory'), error, true);

    makeGetRequest('agency', null, loadAllData.bind(null, 'feedagency'), error, true);
});


function addCategory() {
    if (document.getElementById("categoryname").value.trim() == "") {
        alert("Enter all value to procced");
        return;
    }
    var payload = {
        title: document.getElementById("categoryname").value.trim()
    }
    // $.ajax({
    //     url: 'https://localhost:7235/api/category',
    //     type: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer ' + (sessionStorage.getItem('credential') || null)
    //     },
    //     data: JSON.stringify(payload),
    //     contentType: 'application/json',
    //     dataType: 'json',
    //     success: function (result) {
    //         alert("Category added");
    //     },
    //     error: function () {
    //         alert('Error while making the AJAX call.');
    //     }
    // });

    makePostRequest('category', payload, function () {
        alert("Category added");
    }, error, true);
}

function addAgency() {
    if (document.getElementById("agencyname").value.trim() == "" || document.getElementById("logopath").value.trim() == "") {
        alert("Enter all value to procced");
        return;
    }
    var payload = {
        name: document.getElementById("agencyname").value,
        logopath: document.getElementById("logopath").value,
    }
    console.log(payload)

    makePostRequest('agency', payload, function () {
        alert("Agency added");
    }, error, true);
}

function addAgencyFeed() {
    if (document.getElementById("feedcategory").value.trim() == "") {
        alert("Enter all value to procced");
        return;
    }
    var payload = {
        agencyId: parseInt(document.getElementById("feedagency").value),
        categoryId: parseInt(document.getElementById("feedcategory").value),
        agencyFeedUrl: document.getElementById("feedurl").value.trim(),
    }
    makePostRequest('addagencyfeed', payload, function () {
        alert("Feed link added");
    }, error, true);
}


function loadAllData(elementname, datastring) {
    dataObj = datastring;
    console.log(dataObj);
    var dropdown = document.getElementById(elementname);

    dataObj.result.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.id;
        option.textContent = item?.title || item?.name;
        dropdown.appendChild(option);
    });
}

function deleteAll() {
    var a = confirm("Are you sure want to delete all data?");
    if (a == true) {
        // $.ajax({
        //     url: 'https://localhost:7235/api/deleteall',
        //     type: 'DELETE',
        //     headers: {
        //         'Authorization': 'Bearer ' + (sessionStorage.getItem('credential') || null)
        //     },
        //     success: function (result) {
        //         alert("Done");
        //     },
        //     error: function () {
        //         alert('Error while making the AJAX call');
        //     }
        // });
        makeDeleteRequest('news', null, function () {
            alert("Done");
        },
            error, true);
    }
}

function isAdmin() {
    var cookies = document.cookie.split(';');
    var adminCookie = cookies.find(cookie => cookie.trim().startsWith('isAdmin='));
    return adminCookie && adminCookie.split('=')[1] === 'true';
}

function error() {
    alert('Error while making the AJAX call.');
}