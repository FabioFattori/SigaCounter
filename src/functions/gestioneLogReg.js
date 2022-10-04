import React from 'react'

function GestioneMinoreDi800px() {
    var elem = document.getElementById('RegButton');
    elem.innerText="Reg";
    elem.textContent="Reg";
}

function GestioneMaggioreDi800px(){
    var elem = document.getElementById('RegButton');
    elem.innerText="Registrazione";
    elem.textContent="Registrazione"; 
}

export {GestioneMinoreDi800px,GestioneMaggioreDi800px}