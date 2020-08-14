//vis eller skjul figurene
function ClickChange(id) {
    var X = document.getElementById(id);

    if (X.style.display == "block") {
        X.style.display = "none";
    } else {
        X.style.display = "block"
    }
}