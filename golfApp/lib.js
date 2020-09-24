//model

const Kvitsund = {
    hull1: 3, hull2: 3, hull3: 3, hull4: 3, hull5: 3, hull6: 3, hull7: 3, hull8: 3, hull9: 3,
    hull10: 4, hull11: 3, hull12: 3, hull13: 3, hull14: 4, hull15: 3, hull16: 3, hull17: 3, hull18: 3
}
var baner = [Kvitsund];



//view
show();
function show() {
const app = document.getElementById('app').innerHTML
let main = true;
main ? app = drawMain() : '';

}
//controller
function drawMain() {
    let html = drawFieldSelector() + drawPlayers(); 
}
function drawFieldSelector() {
    let options = ``;
    let selected;
    for (let i = 0; i < baner.length; i++) {
        options += '<option value="' + i + '">' + baner[i] + '</option>';
    };
    let html = `<select name="baneValg" id="baneValg">
               ${options}
                </select>`;
    return html;
}
function drawPlayers() {
    let players = [];
    let table = ``;
    for (let i = 0; i < players.length; i++) {
        table += '<table><tr><td>' + players[i] + '</td></tr></table>'
    }
    let html = `<input type="text" id="playerName name="playerName" value="player = this.value">
                <button onclick="addPlayer(player)">+</button>
                <div>${table}</div>`
        ;
    return html;
}
//drawPlayers hjelpefunc.
function addPlayer(player) {
    let players = [];
    players.push(player);
    return players;
    show();
}