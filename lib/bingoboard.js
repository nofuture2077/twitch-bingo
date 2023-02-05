function generateCell(index, gameState, cellEventHandler) {
    let freeCenter = gameState.free && index === 12;
    let pressed = gameState.checked[index] || freeCenter; 
    let div = document.createElement('div');
    div.classList = 'cell-contents';

    let button = document.createElement('button');
    button.setAttribute("aria-pressed", pressed);
    button.classList = 'cell-toggle';
    button.innerHTML = gameState.userItems[index];
    button.onclick = cellEventHandler ? () => cellEventHandler(button, index) : undefined;

    if (freeCenter) {
        button.setAttribute("disabled", freeCenter)
        button.innerHTML = "<img src='img/capy.png' width='100%' />"
    }

    div.appendChild(button);
    return div;
}

function createTable(tableId, gamestate, cellEventHandler) {
    var table = document.createElement("table");
    table.setAttribute("role", "grid");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("role", "rowgroup");
    table.appendChild(tbody);
    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        row.setAttribute("role", "row");
        for (var j = 0; j < 5; j++) {
        var cell = row.insertCell();
        cell.setAttribute("role", "gridcell");
        cell.appendChild(generateCell(i*5 + j, gamestate, cellEventHandler));
        }
    }
    var tableContainer = document.getElementById(tableId);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function buildUserIndex(length, max, seed) {
    let mapping = [...Array(max).keys()];
    return shuffleSeed.shuffle(mapping, seed).slice(0, length);
}

function randomSample(items, length, seed) {
    var shuffledMapping = buildUserIndex(length, items.length, seed);
    let result = [];

    for (i = 0; i < length; i++) {
        let value = items && items.length > shuffledMapping[i] && items.at(shuffledMapping[i])
        result.push(value);
    }
    return result;
}

function chunks(array, chunk_size) {
    return Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
}

function getQueryVariable(query, variable) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}