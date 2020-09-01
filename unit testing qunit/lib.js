function fixText(testText) {
    var x = testText;
    var s = x.replace(/\s+/g, '');
    var c = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return c;

    //removes spaces, makes first letter uppercase and all other letters lowercase
}
