function isDayValid(dato)
{
    //trekker ut dag og gjør om til tall
    dag = parseInt(dato.slice(0, 2));
    year = dato.slice(6, 10);
    mnd = parseInt(dato.slice(3, 5));
    //sjekker om dag er mer enn 01 mindre enn 28
   
    return ((dag >= 01 && dag <= 28) ?
        true :
        //hvis februar og skuddår 29 dager
        (((mnd == 02 && ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
            && (dag >= 01 && dag <= 29)) ?
            true :
            //hvis mnd har 30 dager
            ((mnd == 04 || mnd == 06 || mnd == 09 || mnd == 11)
                && (dag >= 01 && dag <= 30)) ?
                true :
                //hvis mnd har 31 dager
                ((mnd == 01 || mnd == 03 || mnd == 05 || mnd == 07 || mnd == 08 | mnd == 10|| mnd == 12)
                    && (dag >= 01 && dag <= 31)))) ?
                    true : false;
}

function isMndValid(dato) {
    //trekker ut mnd og gjør om til tall
    mnd = parseInt(dato.slice(3, 5));
    //sjekker om mnd er mindre enn 12 og mer enn 00
    return (mnd >= 01 && mnd <= 12) ? true : false;
}

function isYearValid(dato) {
    year = dato.slice(6, 10);
    //sjekker om year er mindre enn eller lik 9999 og mer enn eller lik 0000
    return (year.length === 4 && year >= '0000' && year <= '9999') ? true : false;
}
function validDot(dato) {
    //sjekker om det er punktum på rett plass
    dot1 = dato.slice(2, 3);
    dot2 = dato.slice(5, 6);
    return ((dot1 == '.') && (dot2 == '.')) ? true : false; 
}

function isDateValid(dato) {
    //sjekker dato.length = 10
    return (dato.length === 10 &&
        //kjører alle funskjonene og retunerer true : false
        isDayValid(dato) &&
        isMndValid(dato) &&
        isYearValid(dato) &&
        validDot(dato)) ? true : false;
}
