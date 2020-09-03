// email adress test


function emailCheck(mail) {
    var b = mail.includes("@", 0);
    
    return b;
}


function spaceCheck(mail) {
    var b = mail.includes(" ");
    return b;
}

function dotCheck(mail) {
    var a = mail.search("@", 0);
    b = mail.slice(0, a);
    c = mail.slice(a);
    
    d = b.includes(".");
    e = c.includes(".");

    if (d == true && e == true) {
        return true;
    } else { return false;}
    
}