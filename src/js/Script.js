let Word = "";
let secretWord = [];
let guessedLetters = [];
let lives = 7;

async function giveWord(dificulty) {
    let archivo = ""
    if (dificulty == "easy") {
        archivo = "src/Docs/easy-list.txt";        
    }else if (dificulty == "medium") {
        archivo = "src/Docs/medium-list.txt";
    }else if (dificulty == "hard") {
        archivo = "src/Docs/hard-list.txt";
    }else {
        let message = "Porfavor seleccione una dificultad vaida";
        alert(message);
        
        return message;
    }


    const response =  await fetch(archivo);
    const text = await response.text();

    const palabras = text
                        .split("\n")
                        .filter(p => p.trim() !== "");
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

async function GameStart(dificulty) {
    Word = await giveWord(dificulty);
    secretWord = Word.split("");
    guessedLetters = [];
    botonesGenrados();
}

function botonesGenrados() {
    const abecedary = "abcdefghijklmnopqrstuvwxyz";
    const container = document.querySelector(".buttons-container");
    container.innerHTML = "";
    abecedary.split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;

        button.addEventListener("click", () => {
            if (guessedLetters.includes(letter)) return;

            guessedLetters.push(letter);
            button.disabled = true;
            
            if (!Word.includes(letter)) {
                lives--;
                muñecoAhorcado();
            }
            mostrarPalabra();
            checkGAme();
        });
        container.appendChild(button); 
    });
}

function mostrarPalabra() {
    const contenedor = document.querySelector(".palabra");
    let output = "";

    for (let word of secretWord) {
        if (guessedLetters.includes(word)) {
            output += word + " ";
        } else {
            output += "_ ";
        }
        }
    contenedor.textContent = output;
    checkGAme();
}

function checkGAme(){
    if (lives <= 0) {
        alert("¡Has perdido! La palabra era: " + Word);
        GameStart();
    }
    const win = secretWord.every(letter => guessedLetters.includes(letter));
    if (win) {
        alert("¡Has ganado! La palabra era: " + Word);
        
    }
}

function muñecoAhorcado() {
    const imagen = document.getElementById("hangman");
    const errores = 7 - lives;

    if (errores == 0){
        imagen.src = "src/img/WoodStructure.png";
    }else if (errores == 1){
        imagen.src = "src/img/Stage1.png";
    }else if (errores == 2){
        imagen.src = "src/img/Stage2.png";
    }else if (errores == 3){
        imagen.src = "src/img/Stage3.png";
    }else if (errores == 4){
        imagen.src = "src/img/Stage4.png";
    }else if (errores == 5){
        imagen.src = "src/img/Stage5.png";
    }else if (errores == 6){
        imagen.src = "src/img/Stage6.png";
    } else if (errores == 7){
        imagen.src = "src/img/Stage7.png";
    }
}