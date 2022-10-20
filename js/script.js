// PRIMO milestone
    //[x]generare 5 numeri casuali (e diversi anche se non richiesto) con funzione
    //[x]metterli in un array random con funzione
    //[x]salvare elemento della pagina in cui visualizzare i numeri in variabile
        //[x]loggare i 5 numeri con .innerhtml
        //[x]impostiamo un controllo che impedisce di aggiugnere nuovi numeri a quelli in pagina

//SECONDO milestone
    //[x]al log parte un timer setTimeout di 30 sec dopo i quali non si visualizzano più(add classe hidden)
        //[x] e l'utente deve inserire i numeri uno alla volta
        //[x] questi numeri inseriti dall'utente andranno salvati in una variabile e pushati in un array
        //[x] SE ci sono numeri dell'array random uguali ai numeri dell'utente verranno scoperti i numeri ricordati correttamente
    
let nmbrs = 5;
let array5Nmbrs = [];

//impostiamo un timer in mls dopo i quali si eseguiranno le funzioni setTimeout
let timer = 3000;

//creo un array vuoto in cui inserirò i numeri che inserirà l'utente
let userArrayNmbrs = [];

//variabile flag che inflenza il comportamento del tasto button
let inGame = false;

//salvo in variabile gruppo di elementi in cui appaiono numeri da memorizzare e a cui darò/toglierò classe hidden
const cols = document.querySelectorAll(".col");
console.log(cols);
//salvo in variabile button Start che aziona la generazione/reset dei numeri da memorizzare
const startBtn = document.querySelector(".btn");

startBtn.addEventListener("click", function(){
    //Se non c'è una partita in corso, si genera un array di 5 numeri casuali tramite funzione
    if(inGame === false){
        array5Nmbrs = generateRndNumberArray(nmbrs, 1, 100);
        console.log(array5Nmbrs);
        //si inserisce il contenuto dell'array in pagina
        putInPage (array5Nmbrs, cols);
        //e si cambia stato entrando in partita
        newGame();

        //funzione ti setTimeout che dopo 3 sec nasconde i numeri con classe hidden
        setTimeout(function(){
            for(let i=0; i<cols.length; i++)
            cols[i].classList.add("hidden");
        }, timer);
    
    } else { 
        //Altrimenti se c'è una partita in corso, cliccando sul button viene resettato tutto 
        cleaningElement (cols);
        resetGame();
    }
})

//salvo in variabile l'elemento button Procedi che farà partire il riempimento dell'array con i numeri inseriti dall'utente
const submitBtn = document.getElementById("submit-btn");

//salvo in variabile il form nel quale l'utente inserisce i numeri
const inputBoxes = document.querySelector(".form-input");
console.log(inputBoxes);

//al click del tasto "Procedi" pusho in un array i numeri che l'utente ha inserito nel form e li confronto, scoprendo quelli corretti
submitBtn.addEventListener("click", function () {
    setTimeout(function(){
        //imposto un controllo che impedisca al click di aggiungere all'array più di 5 numeri
        if(userArrayNmbrs <= 5){
            //ciclo l'insieme degli input sulla pagina in modo da estrarne il valore e pusharlo nell'array userArrayNmbrs
                for(let i = 0; i < inputBoxes.length; i++){
                    const userValue = parseInt(inputBoxes[i].value);
                    userArrayNmbrs.push(userValue);
                    console.log(typeof(userValue));
                    
                    //SE il valore è incluso nell'array dei nm. da memorizzare, 
                    if (array5Nmbrs.includes(userValue)){
                        //si scorre l'array degli elementi sulla pagina
                        for(let j=0; j<cols.length; j++){
                            //e SE ci sia uguaglianza tra numero nell'array utente e numero array da ricordare 
                            if(userValue===array5Nmbrs[j]){
                                //si rimuove la classe Hidden a quegli elementi
                                console.log("Questo numero corrisponde: " + userValue );
                                cols[j].classList.remove("hidden");
                            }
                        }
                    }
                }
                console.log("numeri utente: " + userArrayNmbrs);
            }
    }, timer + 1000);
    
 })

 //al click del button reveal la classe hidden viene rimossa rendendo nuovamente visibili tutti i numeri, nel caso il giocatore voglia verificare quali ha dimenticato
 const revealBtn = document.getElementById("reveal-btn");
 revealBtn.addEventListener("click", function () {
    if(array5Nmbrs.length===5){
        removeClass(cols, "hidden");
    }
 })


///////////----------FUNCTIONS----------///////////


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

/**
 * Description: Funzione che cambia stato al flag inGame (entriamo nella partita): ora il tasto serve ad uscire*/
function newGame(){
    inGame = true;
    startBtn.innerHTML = "";
    startBtn.innerHTML = "Reset Game";
    removeClass(cols, "hidden")
}

/**
 * Description: Funzione che che cambia stato al flag inGame (usciamo dalla partita): ora il tasto serve ad entrare in partita*/
function resetGame(){
    inGame = false;
    startBtn.innerHTML = "";
    startBtn.innerHTML = "New Game";

    const userInputBox = document.getElementsByClassName("user-number");
    //al reset della partita, anche i valori inseriti dall'utente si resettano
    for(let i= 0; i <userArrayNmbrs.length; i++){
        userInputBox[i].value = "";
        //rimuovo la classe hidden quando il gioco riparte
        removeClass(cols, "hidden");
    }
    //svuoto l'array dell'utente al reset della partita
    userArrayNmbrs = [];
}

/**
 * Description: Funzione che rimuove classe da elementi della pagina in cui appaiono i numeri generati casualmente
 * @param {element} elemento di un Array o simili da cui rimuovere classe
 * @param {string} stringa indicante classe da rimuovere
*/
 function removeClass(element, className){
    for(let i = 0; i<element.length; i++)
    element[i].classList.remove(`${className}`);
 }
