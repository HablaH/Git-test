//controller
function pickView() {
    if (main) { return drawMain(); }
    else if (roundOn) { return drawRound(); }
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
    for (let i = 0; i < players.length; i++) {
        table += '<table><tr><td>' + players[i] + '</td></tr></table>'
    }
    let html = `<input type="text" id="playerName name="playerName" value="Navn" oninput="playerAdd = this.value">
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
    show();
}

//Round screen
function drawRound() {
    //output er navn på valgt bane, hull med navigasjon.
    //players tabell med antall slag og par utregning skal legges til (roundPlayers()) 
    
    html = `<h1> ${baner[selected][0]}</h1>
            <div><button onclick="bytteHull(-1)"><</button><p>hull ${hull}</p><button onclick="bytteHull(+1)">></button></div>
            `;


    return html;
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
    //skal lage en tabell for players med knapper for antall kast og par-utregning
    for (let i = 0; i < players.length; i++) {
   
        table += '<table><tr>' + '<td>' + players[i] + '</td></tr>' +
            `<tr><td><input type="number" id="quantity" name="quantity" min="1"></td></tr>` +
            `<tr><td></td></tr>` +
                 '</table>';
    }
    
}

function createRoundArray() {
//lager array der hver player er ett objekt med antall kast på hvert hull
    
    let a = rundeListe;
    for (let i = 0; i > players.length - 1; i++) {
        a.push(players[i]);
    }
        
}