//controller
function pickView() {
    if (main) { return drawMain(); }
    if (roundOn) { return drawRound(); }
    if (result) { return drawResult(); }
}
//main screen
function drawMain() {
    //output er drawFieldSelector() + drawPlayers() + startRound() knapp
    let html = drawFieldSelector() + drawPlayers() + `<button onclick="startRound()">Start</button>`;
    return html;
}
function drawFieldSelector() {
    //her lages bane selector ut fra baner array valgt bane legger verdi til selected variabelen
    let options = ``;
    for (let i = 0; i < baner.length; i++) {
        options += '<option value="' + i + '">' + baner[i][0] + '</option>';
    };
    let html = `<select name="baneValg" id="baneValg" onchange="selected = this.value">
               ${options}
                </select><br><br>`;
    return html;
}
function drawPlayers() {
    //input til navn + table konstruksjon for navnene som blir lagret i players array
    let table = ``;
    let tr = ``
    for (let i = 0; i < players.length; i++) {
        tr += '<tr><td>' + players[i] + '</td></tr>'
    }
    table = `<table><th>Spiller</th>${tr}</table>`
    let html = `<input type="text" id="playerName name="playerName" value="" oninput="playerAdd = this.value">
                <button onclick="addPlayer(playerAdd)">+</button><br><br>
                <div>${table}</div><br><br>`
        ;
    return html;
}
//drawPlayers hjelpefunc.
function addPlayer(player) {
    //pusher player input til players array
    players.push(player);
    show();
    return;    
}

function startRound() {
    //går fra mainscreen til roundscreen
    main = false;
    roundOn = true;
    createRoundArray();
    show();
}

//Round screen
function drawRound() {
    //output er navn på valgt bane, hull med navigasjon.
    //players tabell med antall slag og par utregning og total (roundPlayers())
    //legge til knapp som avslutter spillet -> resultat
    
    let html = `<h1>${baner[selected][0]}</h1>
            <div style="display:flex">
                <button onclick="bytteHull(-1)"><</button>
                <p>Hull ${hull} Par ${baner[selected][hull]}</p>
                <button onclick="bytteHull(+1)">></button>
            </div>
            <br><br>
            ${roundPlayers()}
            <br><br>
            <button onclick="endRound()">Ferdig</button>
`;
    
    return html;
}

function sortTable() {
    // sorterer tabellen laveste score ligger øverst
    var table, rows, switching, i, a, b, x, y, shouldSwitch;
    table = document.getElementById('scoreCard');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            a = rows[i];
            b = rows[(i + 1)];
            x = a.children[3];
            y = b.children[3];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            a.parentNode.insertBefore(b, a);
            switching = true;
        }
    }
}

function bytteHull(n) {
    //navigerer frem og tilbake mellom hullene ved hjelp av hull variabelen 
    let b = baner[selected];

    hull = hull + n;
    if (hull <= 1) hull = 1;
    if (hull >= b.length - 1) hull = b.length - 1;
    
    show();
}
function roundPlayers() {
    //skal lage en tabell for players med knapper for antall kast og par-utregning + total
    let table = ``;
    let tr = ``;
    for (let i = 0; i < players.length; i++) {
        let a = rundeListe[i][hull]
        let b = (a) - (baner[selected][hull]);
        tr += `<tr><td>${players[i]}</td>
            <td><input type="number" id="antall" name="antall" min="0" value="${a}" oninput="setAntall(this.value, ${i})"></td>
            <td>${b}</td><td>${regnUtTotal(i)+b}</td></tr>`
    }
    table = `<table id="scoreCard"><th>Navn</th><th>Score</th><th>Par</th><th>Total</th>${tr}</table>`
    return table;
}

function setAntall(antall, i) {
    rundeListe[i][hull] = antall;
    show();
}

function regnUtTotal(n) {
    let sum = 0;
    for (let i = 1; i < hull; i++) {
        sum += (rundeListe[n][i]) - (baner[selected][i]);
    }
    return sum;
}

function createRoundArray() {
//lager array der hver player er ett objekt med antall kast på hvert hull
    
    
    for (let i = 0; i < players.length; i++) {
        rundeListe.push(players[i]);
        rundeListe[i] = {};
        for (let n = 1; n < baner[selected].length; n++) {
           
            rundeListe[i][n] = 0;
        }
    }
        
}

function endRound() {
    roundOn = false;
    result = true;

    show();
}

function drawResult() {
    let html = '';
    let table = ``;
    let tr = ``;
    for (let i = 0; i < players.length; i++) {
        tr += `<tr><td>${players[i]}</td>
             <td>${regnUtTotal(i)}</td></tr>`
    }
    table = `<table id="scoreCard"><th>Navn</th><th>Total</th>${tr}</table>`

    html = `<h1>${baner[selected][0]}</h1>
            <br><br>
            ${table}
`
    return html;
}