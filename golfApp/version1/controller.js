function addPlayer() {
    if (model.player == '') return;
    model.playerList.push(model.player);
    model.player = '';
    show();
}

function removePlayer(index) {
    model.playerList.splice(index, 1);
    show();
}

function startRound() {
    //går fra mainscreen til roundscreen
    model.view.main = false;
    model.view.round = true;
    createRoundArray();
    show();
}

function createScoreCard() {
    let players = model.playerList;
    let currentField = model.currentField;
    let field = model.fields[currentField].parValues;
    for (let i = 0; i < players.length; i++)
    {
        for (let h = 0; h < field.length; h++)
        {
            model.score.push({ 'player': i, 'field': currentField, 'holeIndex': h, 'result': 0, });
        }
    }
}

function changeScore(player, n) {
    let scores = model.score.filter(
        score => score.player === player
            && score.field === model.currentField
            && score.holeIndex === model.currentHole);
    scores[0].result = n;
}

function totalScore(player) {
    let scores = model.score.filter(
        score => score.player === player
            && score.field === model.currentField);
    let par = model.fields[model.currentField].parValues;
    let a = 0;
    for (let i = 0; i < par.length; i++) {
        if (scores[i].result === 0) continue;
        a += scores[i].result - par[i];
    }
    return a;
}

function addField() {
    //bytter til addField view
    model.view.main = false;
    model.view.addField = true;
    show();
}

function saveField() {
    //lagrer verdiene fra addField i array baner
    baner.push(saveFieldFunc());
    model.view.addField = false;
    model.view.main = true;
    show();

}
function saveFieldFunc() {
    //lager en array av verdiene fra addField
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
//hjelpefunksjoner til addField
function exceptionCount(n) {
    //teller opp og ned på exception, kan ikke gå under 0
    model.fieldVariables.exceptions = (model.fieldVariables.exceptions + n);
    if (model.fieldVariables.exceptions < 0) model.fieldVariables.exceptions = 0;
    show();
}

function bytteHull(n) {
    //navigerer frem og tilbake mellom hullene ved hjelp av hull variabelen 
    let b = baner[selected];

    hull = hull + n;
    if (hull <= 1) hull = 1;
    if (hull >= b.length - 1) hull = b.length - 1;

    show();    
}

function endRound() {
    //runden er over, bytter til result view
    model.view.round = false;
    model.view.result = true;

    show();
    sortTable();
}

function back() {
    //tilbake en side
    if (model.view.round) {
        model.view.round = false;
        hull = 1;
        model.view.main = true;
    } if (model.view.result) {
        model.view.result = false;
        model.view.round = true;
    } if (model.view.addField) {
        model.view.addField = false;
        fieldAdd = '';
        fieldHoles = 0;
        exception = 0;
        model.view.main = true;
    }
        show();
        return;
    }
