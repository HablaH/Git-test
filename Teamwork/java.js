function Click() {
    var element = document.getElementById("Mads");
    var color = element.backgroundColor;

    element.backgroundColor = 'White';

    setTimeout(Reset(color, element), 1000);
}

function Reset(color, element) {
    element.backgroundColor = color;
}