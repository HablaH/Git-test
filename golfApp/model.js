//model

//const bKvitsund = {
//    hull1: 3, hull2: 3, hull3: 3, hull4: 3, hull5: 3, hull6: 3, hull7: 3, hull8: 3, hull9: 3,
//    hull10: 4, hull11: 3, hull12: 3, hull13: 3, hull14: 4, hull15: 3, hull16: 3, hull17: 3, hull18: 3
//}
const baner = [
    ['Velg bane'],
    ['Kvitsund', 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3],
    ['Muselunden'],
    ['Ekeberg']
]
//const kvitsund = [3,3,3,3,3,3,3,3,3,4,3,3,3,4,3,3,3,3]
//var banerNavn = ['Velg bane','Kvitsund', 'Muselunden', 'Ekeberg'];

let main = true;
let fieldForm = false;
let roundOn = false;
let result = false;
let hull = 1;
let players = [];
let fieldAdd = '';
let fieldHoles = 0;
let exception = 0;
let playerAdd;
let selected;
let scoreCard = [];