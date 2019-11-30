function addCell(tr, val) {
    var td = document.createElement('td');

    if (Array.isArray(val))
    {
        td.style.overflow = 'auto';
        val.forEach((item) => {
            if (!isNaN(Date.parse(item))) //Checks if the value is a Date
            {
                item = item.split('T')[0];
            }
            td.innerHTML += item + '<br/>';
        })
    }
    else
    {
        td.innerHTML = val;
    }

    tr.appendChild(td)
}

function addRow(tbl, data) {
    var tr = document.createElement('tr');

    addCell(tr, data.ssn);
    addCell(tr, data.firstName);
    addCell(tr, data.middleName);
    addCell(tr, data.lastName);
    addCell(tr, data.crimes);
    addCell(tr, data.admitDate.split('T')[0]);

    if (data.releaseDate) {
        addCell(tr, data.releaseDate.split('T')[0])
    }
    else {
        addCell(tr, data.releaseDate)
    }

    addCell(tr, data.courtDates);

    tbl.appendChild(tr)
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:3000/api/prisoner', true);

request.onload = function () {
    const response = JSON.parse(this.response);
    response.data.forEach((row) => {
        addRow(document.getElementById('prisonerTable'), row);
    })
};

request.responseType = 'text';

// Send request
request.send();