//controller
function pickView() {
    if (main) { return drawMain(); }
    if (fieldForm) { return drawFieldForm(); }
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
                </select>
                <button onclick="addField()">+</button><br><br>
                <br><br>`;
    return html;
}

function addField() {
    //bytter til fieldForm view
    main = false;
    fieldForm = true;
    show();
}
function drawFieldForm() {
    //tegner fieldForm med navn input
    //valg av antall hull mellom 0 og 18
    //hvilke hull er ikke par 3 og hva er de egentlig
    html = ``;

    html = `<p>Navn p&aring; banen:</p>
        <input type="text" id="fieldName name="fieldName" value="${fieldAdd}" oninput="fieldAdd = this.value">
        <br><p>Antall hull:</p>
        <input type="number" id="antallHull" name="antallHull" value="${fieldHoles}" min="0" max="18" oninput="fieldHoles = parseInt(this.value)">
        <br><p>Appen tar utgangspunkt i at alle hull har par = 3 klikk her for &aring; legge til unntak</p>
        <button onclick="exceptionCount(+1)">+</button><button onclick="exceptionCount(-1)">-</button>
        ${drawExceptions()}
        <br><br>
        <button onclick="saveField()">Lagre</button>
        <button onclick="back()">Tilbake</button>
        
        `
    return html;
}
function saveField() {
    //lagrer verdiene fra fieldForm i array baner
    baner.push(saveFieldFunc());
    fieldForm = false;
    main = true;
    show();

}
function saveFieldFunc() {
    //lager en array av verdiene fra fieldForm
    let a = [];
    a.push(fieldAdd);
    for (let i = 0; i < fieldHoles; i++) {
        a.push(3);
    }
    for (let i = 0; i < exception; i++) {
        let str = "index = document.getElementById('unntakIndex" + i + "')"
        eval(str);
        str = "par = document.getElementById('unntakPar" + i + "')"
        eval(str);
        a.splice(parseInt(index.value), 1, parseInt(par.value))
    }
    return a;
}

//hjelpefunksjoner til fieldForm
function exceptionCount(n) {
    //teller opp og ned p� exception, kan ikke g� under 0
    exception = (exception + n);
    if (exception < 0) exception = 0;
    show();
}

function drawExceptions() {
    //tegner opp tabell med 2 inputs per row
    //lagrer inputs i lokale variabler?
    let html = ``;
    let table = ``;
    for (let i = 0; i < exception; i++) {
        table += `<tr><td><input type="number" id="unntakIndex${i}" name="unntakIndex${i}" value="" oninput=""></td>
                 <td><input type="number" id="unntakPar${i}" name="unntakPar${i}" value="" oninput=""></td></tr>
                `
    }
    html = `<table>
            <tr><th>hull#</th><th>par</th></tr>
            ${table}
            </table`
    return (exception == 0) ? '': html;        
}

function drawPlayers() {
    //input til navn + table konstruksjon for navnene som blir lagret i players array
    let table = ``;
    let tr = ``
    for (let i = 0; i < players.length; i++) {
        tr += `<tr><td>${players[i]}<button onclick="removePlayer(${i})">X</button></td></tr>`
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

function removePlayer(index) {
    //fjerner valgt spiller fra players array
    players.splice(index, 1);
    show();
}

function startRound() {
    //g�r fra mainscreen til roundscreen
    main = false;
    roundOn = true;
    createRoundArray();
    show();
}

//Round screen
function drawRound() {
    //output er navn p� valgt bane, hull med navigasjon.
    //players tabell med antall slag og par utregning og total (roundPlayers())
    //knapp som g�r tilbake til main og knapp som avslutter spillet -> resultat
    
    let html = `<h1>${baner[selected][0]}</h1>
            <div style="display:flex">
                <button onclick="bytteHull(-1)"><</button>
                <p>Hull ${hull} Par ${baner[selected][hull]}</p>
                <button onclick="bytteHull(+1)">></button>
            </div>
            <br><br>
            ${roundPlayers()}
            <br><br>
            <div style="display:flex;">
            <button onclick="back()">Tilbake</button>
            <button onclick="endRound()">Ferdig</button>
            </div>
`;
    
    return html;
}

function sortTable() {
    // sorterer tabellen laveste score ligger �verst
    // brukes p� result view 
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
            x = a.children[1];
            y = b.children[1];
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

function sortTableRound() {
    // sorterer tabellen laveste score ligger �verst (utifra forrige hulls utregning?)
    if (hull == 1) return;
    var table, rows, switching, a, b, c, d, e, f, g, shouldSwitch;
    table = document.getElementById('scoreCard');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (let i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            a = rows[i];
            b = rows[(i + 1)];
            c = parseInt(scoreCard[i][(hull - 1)]);
            d = baner[selected][(hull - 1)];
            e = (c - d);
            f = parseInt(scoreCard[(i + 1)][(hull - 1)]);
            g = (f - d);            
            if (e > g) {
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
    sortTableRound();
}
function roundPlayers() {
    //lager en tabell for players med knapper for antall kast og par-utregning + total
    let table = ``;
    let tr = ``;
    for (let i = 0; i < players.length; i++) {
        let a = scoreCard[i][hull]
        let b = (a) - (baner[selected][hull]);
        tr += `<tr><td>${players[i]}</td>
            <td><input type="number" id="antall" name="antall" min="0" value="${a}" oninput="setAntall(this.value, ${i})"></td>
            <td>${b}</td><td>${regnUtTotal(i)}</td></tr>`
    }
    table = `<table id="scoreCard"><th>Navn</th><th>Score</th><th>Par</th><th>Total</th>${tr}</table>`
    return table;
}

function setAntall(antall, i) {
    //lagrer antall kast i scoreCard object array
    scoreCard[i][hull] = antall;
    show();
}

function regnUtTotal(n) {
    //regner ut total score for de hullene som har antall kast verdi
    let sum = 0;
    for (let i = 1; i < baner[selected].length; i++) {
        a = parseInt(scoreCard[n][i])
        b = baner[selected][i]
        if (a != 0) {
            sum += a - b;
        }
    }
    return sum;

}

function createRoundArray() {
//lager array der hver player er ett objekt med antall kast p� hvert hull
    
    
    for (let i = 0; i < players.length; i++) {
        scoreCard.push(players[i]);
        scoreCard[i] = {};
        for (let n = 1; n < baner[selected].length; n++) {
           
            scoreCard[i][n] = 0;
        }
    }
        
}

function endRound() {
    //runden er over, bytter til result view
    roundOn = false;
    result = true;

    show();
    sortTable();
}

function drawResult() {
    //tegner opp banevalg og totalscore til hullet man endte p�.
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
            <br><br>
            <button onclick="back()">Tilbake</button>
            <button onclick="newRound()">Ny Runde</button>
`
    console.log(table)
    return html;
}

function sortResultTable() {

}

function newRound() {
    //bytter til main view, setter hull til 1 og blanker scoreCard 
    result = false;
    hull = 1;
    scoreCard = [];
    main = true;
    show();
}

function back() {
    //tilbake en side
    if (fieldForm) {
        fieldForm = false;
        main = true;
        show();
        return;
    }
    if (roundOn) {
        roundOn = false;
        hull = 1;
        main = true;
        show();
        return;
    }
    if (result) {
        result = false;
        roundOn = true;
        show();
        return;
    }
    if (fieldForm) {
        fieldForm = false;
        fieldAdd = '';
        fieldHoles = 0;
        exception = 0;
        main = true;
        show();
    }
}