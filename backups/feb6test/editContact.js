// JavaScript source code
var currentRow = 0;
var entries = document.getElementsByClassName('unsetTable');

function editContact() {
    console.log("Edit Button Pressed");
    console.log("unsetTable = " + entries.length);
    if (entries.length > 0) {
        console.log("Condition Met. entries = " + entries.length);
        tableSetter();
    } else {
        console.log("Condition Not Met. entries = " + entries.length);
    }
    return;
}


function tableSetter() {
    currentRow = entries.length / 4
    console.log("tabelSetter entered");

    for (var i = entries.length - 1; i > -1; i--) {
        entries[i].classList.add('setTable' + currentRow);
        entries[i].classList.remove("unsetTable");

        if(i % 4 == 0 && i > 0){
            currentRow--;
            console.log("Iterating");
        }

        console.log("i is " + i);

        console.log("Looped");
    }

    console.log("Complete");
}