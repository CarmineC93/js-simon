// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri spariscono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// Consigli del giorno:
// * Pensate prima in italiano.
// * Dividete in piccoli problemi la consegna.
// * Individuate gli elementi di cui avete bisogno per realizzare il programma.
// :avviso:  Ricordatevi che oggi pomeriggio ci sarà il recap sulle funzioni :paperella: :party_blob:

// PRIMO milestone
//[x]generare 5 numeri casuali (e diversi anche se non richiesto) con funzione
//[x]metterli in un array random
//[x]salvare elemento della pagina in cui visualizzare i numeri in variabile
    //[x]loggare i 5 numeri con innerhtml 

    //SECONDO milestone
//al log parte timer set timeout di 30 sec dopo i quali non si visualizzano(come? classe hinner)
    //e l'utente deve inserire i numeri uno alla volta
    //questi numeri inseriti dall'utente andranno salvati in una variabile e pushati in un array
    //SE ci numeri dell'array random uguali ai numeri del utente verrà loggato un messaggio con i numeri uguali
    
let nmbrs = 5;
let array5Nmbrs = [];

let inGame = false;

const cols = document.querySelectorAll(".col");
const startBtn = document.querySelector(".btn");


startBtn.addEventListener("click", function(){
    if(inGame === false){
        array5Nmbrs = generateRndNumberArray(nmbrs, 1, 100);
        putInPage (array5Nmbrs, cols);
        inGame = true;
        startBtn.innerHTML = "";
        startBtn.innerHTML = "Reset"
    } else { 
        cleaningElement (cols);
        inGame = false;
        startBtn.innerHTML = "";
        startBtn.innerHTML = "New Game"
    }

})













/**
 * Description: Funzione che genera un array con X elementi (diversi) random in un range di numeri A, B
 * @param {number} howManyElements
 * @param {number} min
 * @param {number} max
 * @returns {array} */
function generateRndNumberArray (howManyElements, min, max){
    const newArray = [];
    let i = 0;
    while ( newArray.length < howManyElements){
        const rndNmbr = Math.floor(Math.random() * (max - min +1)) + min;
        //controllo che escluda numeri già presenti
        if (!newArray.includes(rndNmbr)){
            i++;
            newArray.push(rndNmbr);
        }
    }
    //ritorniamo valore dell'array
    return newArray;
}

/**
 * Description: Funzione che sposta in pagina componenti di un array
 * @param {array} array da cui prelevare elementi
 * @param {object} elemento di destinazione
 * @returns {/} */
 function putInPage (array, element){
     //per ogni indice dell'array random ne metto uno negli elementi sulla pagina 
     for (let i = 0; i < element.length ; i++ ){
         let nmbr = array[i];
        element[i].innerHTML += nmbr;
    }
}

/**
 * Description: Funzione che "pulisce" il contenuto degli elementi selezionati della pagina
 * @param {object} elemento da "pulire"
 * @returns {/} */
function cleaningElement (element){
    for (let i = 0; i < element.length ; i++){
       element[i].innerHTML = "";
   }
}

