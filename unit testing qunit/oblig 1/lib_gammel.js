// JavaScript source code

var dato;
var dag;
var mnd;
var year;
var dot1;
var dot2;
var leapYear;
var riktigDag;
var riktigMnd;
var riktigYear;
var riktigDot;
function sendInn(datoInn)
{
    dato = datoInn;
    dag = dato.slice(0, 2);
    dot1 = dato.slice(2, 3);
    mnd = dato.slice(3, 5);
    dot2 = dato.slice(5, 6);
    year = dato.slice(6);
    leapYear = isLeapYear();
    riktigDag = isDayValid();
    riktigMnd = isMndValid();
    riktigYear = isYearValid();
    riktigDot = validDot();
}
function isDayValid()
{
    //sjekker om dag er mer enn 01 mindre enn 28
    var a;
    if (dag.length === 2 && dag >= '01' && dag <= '28') {
        a = true;
        //hvis februar og skuddår 29 dager
    } else if ((mnd == 02 && leapYear == true) && (dag.length === 2 && dag >= '01' && dag <= '29')) {
        a = true;
        //hvis mnd har 30 dager
    } else if ((mnd == 04 || mnd == 06 || mnd == 04 || mnd == 09 || mnd == 11) && (dag.length === 2 && dag >= '01' && dag <= '30')) {
        a = true;
        //hvis mnd har 31 dager
    } else if ((mnd == 01 || mnd == 03 || mnd == 05 || mnd == 07 || mnd == 08 || mnd == 12) && (dag.length === 2 && dag >= '01' && dag <= '31')) {
        a = true;
    } else {
        a = false;
    }
    
    //bytte farge på knapp
    if (a == true) {
        document.getElementById('btn1').style.backgroundColor = 'green';
    } else { document.getElementById('btn1').style.backgroundColor = 'red'; }
    return a;
}

function isMndValid()
{
    //sjekker om mnd er mindre enn 12 og mer enn 00
    var a;
    if (mnd.length === 2 && mnd >= '01' && mnd <= '12') {
        a = true;
    } else {
        a = false;
    }
    //bytte farge på knapp
    if (a == true) {
        document.getElementById('btn2').style.backgroundColor = 'green';
    } else { document.getElementById('btn2').style.backgroundColor = 'red'; }
    return a;
}

function isYearValid()
{
    //sjekker om year er mindre enn eller lik og mer enn eller lik 0000
    var a;
    if (year.length === 4 && year >= '0000' && year <= '9999') {
        a = true;
    } else {
        a = false;
    }
    //bytte farge på knapp
    if (a == true) {
        document.getElementById('btn3').style.backgroundColor = 'green';
    } else { document.getElementById('btn3').style.backgroundColor = 'red'; }
    return a;
}
function validDot()
{
    //sjekker om det er punktum på rett plass
    var a;
    if ((dot1 == '.') && (dot2 == '.')) {
        a = true;
    } else {
        a = false;
    }
    //bytte farge på knapp
    if (a == true) {
        document.getElementById('btn4').style.backgroundColor = 'green';
    } else { document.getElementById('btn4').style.backgroundColor = 'red'; }
    return a;
}
// funksjon for skuddår
function isLeapYear() {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function isDateValid() {
    var a;
    if ((riktigDag == true) &&
        (riktigMnd == true) &&
        (riktigYear == true) &&
        (riktigDot == true)) {
        a = true;
    } else {
        a = false;
    }
    return a;
}