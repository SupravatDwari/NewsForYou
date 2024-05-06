$(document).ready(function () {
    $('#navbar').load('Navbar.html');
    makeGetRequest('agency', null, populatePaper, function () {
        console.log('Error while making the AJAX call.');
    }, false);
});

function populatePaper(data) {
    data = data.result;
    const container = $('#allPaper');

    container.innerHTML = '';

    for (let i = 0; i < data.length; i += 3) {
        const row = $('<div></div>');
        row.addClass('row', 'row-eq-height');
        // Loop through the current set of 3 items
        for (let j = i; j < i + 3 && j < data.length; j++) {
            const element = data[j];
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('col-md-4', 'mb-3', 'd-flex');

            var cardInnerHtml = `
                <div class="card flex-fill" width="30%">
                    <img src="${element.logopath}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column">
                        <button id="${element.id}" onclick="setId(this)" class="btn btn-primary mt-auto">${element.name}</button> <!-- Add mt-auto for bottom alignment -->
                    </div>
                </div>
            `;

            cardDiv.innerHTML = cardInnerHtml;

            row.append(cardDiv);
        }

        container.append(row);
    }
}

function setId(e) {
    sessionStorage.setItem("newsId", parseInt(e.id));
    window.location.pathname = '/Index.html';
}
