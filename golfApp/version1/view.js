//view
show();
function show() {
    const app = document.getElementById('app');

    app.innerHTML = pickView();
}

//hjelpefunksjoner til view
function pickView() {
    if (model.view.main) { return drawMain(); }
    if (model.view.addField) { return drawFieldForm(); }
    if (model.view.round) { return drawRound(); }
    if (model.view.result) { return drawResult(); }
}

//main screen
function drawMain() {
    //output er drawFieldSelector() + drawPlayers() + startRound() knapp
    let html = `
<div>${drawFieldSelector()}</div>
<div>${drawPlayers()}</div>
<div><button onclick="startRound()">Start</button></div>`;
    return html;
}
//addField view
function drawFieldSelector() {
    //her lages bane selector ut fra baner array valgt bane legger verdi til selected variabelen
    let options = `<option value="" disabled selected hidden>Velg bane</option>`;
    for (let i = 0; i < model.fields.length; i++) {
        options += '<option value="' + i + '">' + model.fields[i].name + '</option>';
    };
    let html = `<select name="baneValg" id="baneValg" value="" onchange="model.currentField = this.value">
               ${options}
                </select>
                <button onclick="addField()">+</button><br><br>
                <br><br>`;
    return html;
}

function drawPlayers() {
    //input til navn + table konstruksjon for navnene som blir lagret i players array
    let table = ``;
    let tr = ``
    let sortedScores = (model.holeIndex == 0) ?
        sortScores(getScores(model.currentHole)).map(ele => ele.player) :
        sortScores(getScores(model.currentHole - 1)).map(ele => ele.player);

    for (let i = 0; i < sortedScroes.length; i++) {
        tr += `<tr><td>${model.playerList[i]}<button onclick="removePlayer(${i})">X</button></td></tr>`
    }
    table = `<table><th>Spiller</th>${tr}</table>`
    let html = `<input type="text" id="playerName name="playerName" value="" oninput="model.player = this.value">
                <button onclick="addPlayer()">+</button><br><br>
                <div>${table}</div><br><br>`
        ;
    return html;
}

function drawFieldForm() {
    //tegner fieldForm med navn input
    //valg av antall hull mellom 0 og 18
    //hvilke hull er ikke par 3 og hva er de egentlig
    html = ``;

    html = `<p>Navn p&aring; banen:</p>
        <input type="text" id="fieldName name="fieldName" value="${model.fieldVariables.name}" oninput="model.fieldVariables.name = this.value">
        <br><p>Antall hull:</p>
        <input type="number" id="antallHull" name="antallHull" value="${model.fieldVariables.holes}" min="0" max="30" oninput="model.fieldVariables.holes = this.value">
        <br><p>Appen tar utgangspunkt i at alle hull har par = 3 klikk her for &aring; legge til unntak</p>
        <button onclick="exceptionCount(+1)">+</button><button onclick="exceptionCount(-1)">-</button>
        ${drawExceptions()}
        <br><br>
        <button onclick="saveField()">Lagre</button>
        <button onclick="back()">Tilbake</button>
        
        `
    return html;
}

function drawExceptions() {
    //tegner opp tabell med 2 inputs per row
    //lagrer inputs i lokale variabler?
    let html = ``;
    let table = ``;
    for (let i = 0; i < model.fieldVariables.exceptions; i++) {
        table += `<tr><td><input type="number" id="unntakIndex${i}" name="unntakIndex${i}" value="" oninput=""></td>
                 <td><input type="number" id="unntakPar${i}" name="unntakPar${i}" value="" oninput=""></td></tr>
                `
    }
    html = `<table>
            <tr><th>hull#</th><th>par</th></tr>
            ${table}
            </table`
    return (model.fieldVariables.exceptions == 0) ? '' : html;
}

//Round view
function drawRound() {
    //output er navn p� valgt bane, hull med navigasjon.
    //players tabell med antall slag og par utregning og total (roundPlayers())
    //knapp som g�r tilbake til main og knapp som avslutter spillet -> resultat

    let html = `<h1>${model.fields[model.currentField].name}</h1>
            <div style="display:flex">
                <button onclick="bytteHull(-1)"><</button>
                <p>Hull ${model.currentHole} Par ${model.fields[model.currentField].parValues[model.currentHole]}</p>
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

function roundPlayers() {
    //lager en tabell for players med knapper for antall kast og par-utregning + total
    let table = ``;
    let tr = ``;
    let lastScore = getScores(model.currentHole - 1);
    let score = getScore(model.currentHole);
    for (let i = 0; i < model.playerList.length; i++) {
        let b = (a) - (baner[selected][hull]);
        tr += `<tr><td>${players[i]}</td>
            <td><input type="number" id="antall" name="antall" min="0" value="${a}" oninput="setAntall(this.value, ${i})"></td>
            <td>${b}</td><td>${totalScore(i)}</td></tr>`
    }
    table = `<table id="scoreCard"><th>Navn</th><th>Score</th><th>Par</th><th>Total</th>${tr}</table>`
    return table;
}

//result view
