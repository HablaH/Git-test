function addPlayer() {
    //adds new player from input to model.playerList
    if (model.player == '') return;
    model.playerList.push(model.player);
    model.player = '';
    show();
}

function removePlayer(index) {
    //removes player by index from model.playerList
    model.playerList.splice(index, 1);
    show();
}

function startRound() {
    //changes view from main to round, fills in model.scores
    model.view.main = false;
    model.view.round = true;
    createScoreCard();
    show();
}

function createScoreCard() {
    //builds scorecard from model.playerList and model.fields[currentField].parValues
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
    // changes score on model.score based on player index(player) and input value(n)
    let scores = model.score.filter(
        score => score.player === player
            && score.field === model.currentField
            && score.holeIndex === model.currentHole);
    scores[0].result = parseInt(n);
}

function totalScore(player) {
    // filters model.score based on (player) and (model.currentField)
    // sums .result - parValues
    // calculate score of (player)
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

function getScore(n) {
// get scores for all players on currentHole(n = 0) or another hole(n = +/-1)
    let scores = model.score.filter(
        score => score.holeIndex === (model.currentHole + n)
            && score.field === model.currentField);
    return scores;
}

function getSortedPlayerValue() {
// sort by score on last hole, returns array of sorted .player values
let sortFunction = (a, b) => a[model.sortField] - b[model.sortField];
let lastScore = getScore(-1);
lastScore.sort(sortFunction);
newPlayerList = lastScore.map(element=>element.player);
return newPlayerList;
}

function sortScoreByLastResult() {
    // gets currentHole model.score objects and sort them by holeIndex -1 .player values
    let newScore = getScore(0);
    let lastScoreOrder = getSortedPlayerValue();
    let newScoreOrder = [];
    for (let i=0; i<lastScoreOrder.length;i++) {
        let a = lastScoreOrder[i];
        newScoreOrder.push(newScore[a]);
    }
    return newScoreOrder;
}

function addField() {
    // changes view from main to addField
    model.view.main = false;
    model.fieldVariables = {name:'',holes:0, exceptions: 0,parValues: []};
    model.view.addField = true;
    show();
}

function saveField() {
    //saves new field in model.fields based on model.fieldVariables
    saveFieldFunc();
    model.view.addField = false;
    model.view.main = true;
    show();

}
function saveFieldFunc() {
    //lager en array av verdiene fra addField
    for (let i = 0; i < model.fieldVariables.holes -1; i++) {
        model.fieldVariables.parValues.push(3);
    }
    for (let i = 0; i < model.fieldVariables.exceptions; i++) {
        let str = "index = document.getElementById('unntakIndex" + i + "')"
        eval(str);
        str = "par = document.getElementById('unntakPar" + i + "')"
        eval(str);
        model.fieldVariables.parValues.splice(parseInt(index.value - 1), 1, parseInt(par.value))
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
    //teller opp og ned p� exception, kan ikke g� under 0
    model.fieldVariables.exceptions = (model.fieldVariables.exceptions + n);
    if (model.fieldVariables.exceptions < 0) model.fieldVariables.exceptions = 0;
    show();
}

function changeCurrentHole(n) {
    //navigerer frem og tilbake mellom hullene ved hjelp av hull variabelen 
    let parValues = model.fields[model.currentField].parValues;

    model.currentHole = model.currentHole + n;
    if (model.currentHole <= 0) model.currentHole = 0;
    if (model.currentHole >= parValues.length -1) model.currentHole = parValues.length - 1;

    show();    
}

function endRound() {
    //runden er over, bytter til result view
    model.view.round = false;
    model.view.result = true;

    show();
}
// functions for drawResult
function sortResult() {
    let totalScores = [];
    let sortedScores;
    let sortFunction = (a, b) => a[model.sortField] - b[model.sortField];
    for(let i=0; i<model.playerList.length;i++) {
        a = totalScore(i);
        b = model.playerList[i];

        totalScores.push({player:b,result:a});
    }
    sortedScores = totalScores.sort(sortFunction);
    return sortedScores;
}

function newRound() {
    //bytter til main view, setter hull til 0 og blanker score og playerList 
    model.view.result = false;
    model.currentField = null;
    model.currentHole = 0;
    model.playerList = [];
    model.score = [];
    model.view.main = true;
    show();
}

function restart() {
    //bytter til main view, setter hull til 1 og blanker scoreCard 
    model.view.result = false;
    model.currentHole = 0;
    model.score = [];
    createScoreCard()
    model.view.round = true;
    show();
}

function backgroundChanger() {
    //changing background depending on view
    
    if (model.view.main) document.body.style.backgroundImage=
    "url('image/mainBackgroundBasket.png')"; 
    if (model.view.addField) document.body.style.backgroundImage=
    "url('image/mainBackgroundPlain.png')";
    if (model.view.round) document.body.style.backgroundImage=
    "url('image/roundsBackgroundBasket.png')";
    if (model.view.result) document.body.style.backgroundImage=
    "url('image/roundsBackgroundPlain.png')";
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
