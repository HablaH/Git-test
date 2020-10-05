//model

const model = {
    view: {main:true,addField:false,round:false,result:false},
    playerList: ['Harald','Gunnar','Andreas'],
    fieldVariables: {name:'',holes:0, exceptions: 0,parValues: []},
    player: '',
    sortField: 'result',
    ascending: true,
    currentField: null,
    currentHole: 0,
    fields: [{
        id: 0,
        name: 'Kvitsund',
        parValues: [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3]
    }, {
        id: 1,
        name: 'Heiane',
        parValues: [3, 4, 3, 2, 3, 3, 5, 3, 3]
    },],
    score: [],
};