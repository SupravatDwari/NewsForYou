$(document).ready(function () {
    $('#navbar').load('Navbar.html');
    if (sessionStorage.getItem("newsId") == null) {
        window.location.href = 'NewsFeed.html';
    }
    var payload = {
        id: parseInt(sessionStorage.getItem("newsId"))
    }
    fetchAllData(payload);
    makeGetRequest('GetCategoriesFromAgencyId', payload, populateSidebar, error, false);
});

function fetchAllData(payload) {
    makeGetRequest('news', { id: parseInt(sessionStorage.getItem("newsId")) }, displayallnews, error, false);
}

function geturl(url) {
    if (url == null) return null;
    console.log(url)
    var tempElement = document.createElement('div');
    tempElement.innerHTML = url;

    // Get the src attribute value
    var src = null;
    try {
        src = tempElement?.firstChild?.getAttribute('src');
    }
    catch (err) {

    }

    return src;
}

function displayallnews(data) {
    console.log(data)
    data = data['allnews']
    const container = document.getElementById('news');

    container.innerHTML = '';

    for (let i = 0; i < data.length; i += 3) {
        const row = document.createElement('div');
        row.classList.add('row', 'row-eq-height');

        for (let j = i; j < i + 3 && j < data.length; j++) {
            const element = data[j];
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('col-md-4', 'mb-3', 'd-flex');

            var cardInnerHtml = `
                <div class="card flex-fill"> <!-- Add flex-fill class for flex items -->
                    ${geturl(element.newsDescription)
                    ? `<img src="${geturl(element.newsDescription)}" class="card-img-top" alt="...">`
                    : ''
                }
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${element.newsTitle}</h5>
                        <p class="card-text">${new Date(element.newsPublishDateTime).toISOString().slice(0, 10)}</p>
                        <button onclick="readit(this,'${element.newsLink}')" id="${element.newsId}" class="btn btn-primary mt-auto">Read it</button> 
                    </div>
                </div>
            `;


            cardDiv.innerHTML = cardInnerHtml;

            row.appendChild(cardDiv);
        }

        container.appendChild(row);
    }
}

function populateSidebar(data) {
    var checkboxes = "";
    data.category.forEach(function (item) {
        checkboxes += '<div class="left-panel"><input type="checkbox" class="form-check-input checkbox mt-0" id="' + item.id + '" value="' + item.title + '">';
        checkboxes += '<label class="checkbox-label" for="' + item.title + '">' + item.title + '</label></div>';
    });
    $("#multiselect").html(checkboxes);
    $(".checkbox").on("click", function () {
        handleCheckboxClick();
    });
}

function handleCheckboxClick() {
    var checkboxArray = [];
    $(".checkbox").each(function () {
        var checkboxId = parseInt($(this).attr("id")); // Convert ID to integer
        var isChecked = $(this).prop("checked");
        if (isChecked) {
            checkboxArray.push(parseInt(checkboxId));
        }
    });
    if (checkboxArray.length == 0) {
        fetchAllData();
    }
    var payload = {
        categories: checkboxArray,
        id: sessionStorage.getItem("newsId")
    };
    makePostRequest('getnewsbycategories', payload, displayallnews, error, false);
}



function readit(e, link) {
    makeGetRequest('incrementnewsclickcount', { id: parseInt(e.id) }, null, error);
    window.location.href = link;
}

function error() {
    alert('Error while making the AJAX call.');
}