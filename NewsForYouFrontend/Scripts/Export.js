$(document).ready(function () {
    checkCookie();
    if (!isAdmin()) {
        window.location.href = "login.html";
    }
});
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const currentDate = new Date();

document.getElementById('startDate').value = formatDate(currentDate);
document.getElementById('endDate').value = formatDate(currentDate);

function exportData() {
    startDate = $("#startDate").val(),
        endDate = $("#endDate").val()
    if (endDate < startDate) {
        alert("Can't procced");
        $('#productTable').DataTable().clear().draw();
        return;
    }
    var payload = {
        startDate: startDate,
        endDate: endDate
    }
    makeGetRequest('report', payload, exportHtml, error,true);
}

function exportHtml(data) {
    data=data.report
    var dataTable = $('#productTable').DataTable(); // Get existing DataTable instance

    // Clear existing data and redraw table
    dataTable.clear().draw();

    // Add new data to the table
    $.each(data, function (index, product) {
        dataTable.row.add([
            product.agencyName,
            product.newsTitle,
            product.clickCount,
        ]).draw(false); // Add data and redraw the table
    });

    // Disable default sorting
    dataTable.order([]).draw();
}

function checkCookie() {
    var cookies = document.cookie.split(';');
    var isLoggedIn = cookies.some(cookie => cookie.trim().startsWith('credential='));
    var isAdmin = cookies.some(cookie => cookie.trim().startsWith('isAdmin=true'));

    // Always show logout if logged in, additionally show admin control if isAdmin
    if (isLoggedIn) {
        document.getElementById("logoutLink").style.display = "block";
        document.getElementById("shownews").style.display = "none";
        if (isAdmin) {
            document.getElementById("adminControlLink").style.display = "block";
            document.getElementById("adminControlExport").style.display = "block";
            document.getElementById("shownews").style.display = "block";
        }
    } else {
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("signupLink").style.display = "block";
    }
}

$(document).ready(function(){
    checkCookie();
});

function logout() {
    document.cookie = "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html";
}



function exportPdf() {
    startDate = $("#startDate").val(),
        endDate = $("#endDate").val()
    if (endDate < startDate) {
        alert("Can't procced");
        $('#productTable').DataTable().clear().draw();
        return;
    }
    var payload = {
        startDate: startDate,
        endDate: endDate
    }
    makeGetRequest('report',payload,makePdf,error,true);
}

function error(){
    alert('Error while making the AJAX call.');
}

function isAdmin() {
    var cookies = document.cookie.split(';');
    var adminCookie = cookies.find(cookie => cookie.trim().startsWith('isAdmin='));
    return adminCookie && adminCookie.split('=')[1] === 'true';
}

function makePdf(result) {
    var reportContent = `<div class="container">
        <h1 class="text-center p-3 mb-4 bg-danger text-white">Generated Report</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Agency Name</th>
                    <th scope="col">News Title</th>
                    <th scope="col">Click Count</th>
                </tr>
            </thead>
            <tbody>`;

    for (var i = 0; i < result.report.length; i++) {
        var entry = result.report[i];
        reportContent += `<tr>
            <td>${entry.agencyName}</td>
            <td>${entry.newsTitle}</td>
            <td>${entry.clickCount}</td>
        </tr>`;
    }

    reportContent += `</tbody>
        </table>
    </div>`;

    var pdf = new jsPDF();

    pdf.fromHTML(reportContent, 15, 15, {
        'width': 170
    });

    pdf.save('exported_report.pdf');
}