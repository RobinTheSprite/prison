function addCell(tr, val) {
    var td = document.createElement('td');

    if (Array.isArray(val))
    {
        td.style.overflow = 'auto';
        val.forEach((item) => {
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
    addCell(tr, data.addresses);
    addCell(tr, data.phone);
    addCell(tr, data.visitDate);
    addCell(tr, data.timeIn);
    addCell(tr, data.timeOut);
    addCell(tr, data.visited);

    tbl.appendChild(tr)
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:3000/api/visitor', true);

request.onload = function () {
    const response = JSON.parse(this.response);
    response.data.forEach((row) => {
        addRow(document.getElementById('visitorTable'), row);
    })
};

request.responseType = 'text';

// Send request
request.send();