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
    createScoreCard();
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

function getScores(n) {
    let scores = model.score.filter(
        score => score.field === model.currentField
            && score.holeIndex === n);
    return scores;
}

function sortScores(scores) {
    let sortFunction = model.ascending ?
        (a, b) => a[model.sortField] - b[model.sortField] :
        (a, b) => b[model.sortField] - a[model.sortField];
    scores.sort(sortFunction);
    return scores;
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
    saveFieldFunc();
    model.view.addField = false;
    model.view.main = true;
    show();

}
function saveFieldFunc() {
    //lager en array av verdiene fra addField
    for (let i = 0; i < model.fieldVariables.holes; i++) {
        model.fieldVariables.parValues.push(3);
    }
    for (let i = 0; i < model.fieldVariables.exceptions; i++) {
        let str = "index = document.getElementById('unntakIndex" + i + "')"
        eval(str);
        str = "par = document.getElementById('unntakPar" + i + "')"
        eval(str);
        model.fieldVariables.parValues.splice(parseInt(index.value), 1, parseInt(par.value))
    }

    model.fields.push(
        {
            'id': model.fields.length,
            'name': model.fieldVariables.name,
            'parValues': model.fieldVariables.parValues
        }
    );
    return;
}
//hjelpefunksjoner til addField
function exceptionCount(n) {
    //teller opp og ned på exception, kan ikke gå under 0
    model.fieldVariables.exceptions = (model.fieldVariables.exceptions + n);
    if (model.fieldVariables.exceptions < 0) model.fieldVariables.exceptions = 0;
    show();
}

function changeCurrentHole(n) {
    //navigerer frem og tilbake mellom hullene ved hjelp av hull variabelen 
    let b = model.fields[selectedHole].parValues;
    let hole = model.currentHole;

    hole = hole + n;
    if (hole <= 1) hole = 1;
    if (hole >= b.length - 1) hole = b.length - 1;

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
