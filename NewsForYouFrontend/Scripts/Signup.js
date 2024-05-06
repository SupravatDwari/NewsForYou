$(document).ready(function () {
    $('#navbar').load('Navbar.html');
});

function signup() {
    if ($("#name").value == "" || $("#emailId").value == "" || $("#password").value == "") {
        alert("Enter all value to procced");
        return;
    }
    var payload = {
        name: $("#name").value,
        email: $("#emailId").value,
        password: $("#password").value
    }
    makePostRequest("signup", payload, success, function () {
        console.log('Error while making the AJAX call.');
    }, false)
}

function success(result) {
    if (result.flag) {
        alert("Signup Done");
        window.location.href = 'login.html';
    }
    else {
        alert("Error!!!!");
    }
}

function checkEmail() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    $.ajax({
        url: 'https://localhost:7235/api/checkemail',
        type: 'GET',
        data: { id: $("#emailId").value },
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if (!result.flag || !emailPattern.test($("#emailId").value)) {
                alert("Email already exists or not valid");
                $("#bttnSignup").disabled = true;
            }
            else {
                $("#bttnSignup").disabled = false;
            }
        },
        error: function () {
            alert('Error while making the AJAX call.');
        }
    });
}