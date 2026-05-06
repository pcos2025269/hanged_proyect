let Word = "";
let secretWord = [];
let guessedLetters = [];
let lives = 7;
let dificulty = "";

document.addEventListener("DOMContentLoaded", () => {

    const difficulty = localStorage.getItem("difficulty");

    console.log("Dificultad recibida:", difficulty);

    if (!difficulty) {
        alert("No hay dificultad seleccionada");
        window.location.href = "index.html";
        return;
    }

    GameStart(difficulty);
}); 

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


    const response =  await fetch(archivo)
                                .catch(err => console.error("Error cargando archivo:", err));
    const text = await response.text();

    const palabras = text
                        .split("\n")
                        .map(p => p.trim().replace(/\r/g, ""))
                        .filter(p => p !== "");
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

async function GameStart(dificulty) {
    lives = 7;
    Word = await giveWord(dificulty);
    secretWord = Word.split("");
    guessedLetters = [];
    botonesGenrados();
    mostrarPalabra();
    actualizarVidas();
    muñecoAhorcado();
}

function botonesGenrados() {
    const abecedary = "abcdefghijklmnopqrstuvwxyz";
    const container = document.querySelector(".letras-container");
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
                actualizarVidas();
            }
            mostrarPalabra();
        });
        container.appendChild(button); 
    });
}

function mostrarPalabra() {
    const contenedor = document.getElementById("word");
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
        disableButtons();
    }
    const win = secretWord.every(letter => guessedLetters.includes(letter));
    if (win) {
        alert("¡Has ganado! La palabra era: " + Word);
        disableButtons();
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll(".letras-container button");

    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

function muñecoAhorcado() {
    const canvas = document.getElementById("hangman");
    const errores = 7 - lives;
    const dibujo = canvas.getContext("2d");

    dibujo.clearRect(0, 0, canvas.width, canvas.height);
    dibujo.strokeStyle = "#ffffff";
    dibujo.lineWidth = 4;
    dibujo.lineCap = "round";
    
    if (!canvas) return;

    if (errores >= 1){
        dibujo.beginPath();
        dibujo.moveTo(10, 220); dibujo.lineTo(190, 220);
        dibujo.moveTo(50, 220);  dibujo.lineTo(50, 10);
        dibujo.moveTo(50, 10);   dibujo.lineTo(130, 10);
        dibujo.moveTo(130, 10);  dibujo.lineTo(130, 40);
        dibujo.stroke();
    }if (errores >= 2){
        dibujo.beginPath();
        dibujo.arc(130, 60, 20, 0, Math.PI * 2);
        dibujo.stroke();
    }if (errores >= 3){
        dibujo.beginPath();
        dibujo.moveTo(130, 80); dibujo.lineTo(130, 150);
        dibujo.stroke();
    }if (errores >= 4){
        dibujo.beginPath();
        dibujo.moveTo(130, 100); dibujo.lineTo(90, 135);
        dibujo.stroke();
    }if (errores >= 5){
        dibujo.beginPath();
        dibujo.moveTo(130, 100); dibujo.lineTo(170, 135);
        dibujo.stroke();
    }if (errores >= 6){
        dibujo.beginPath();
        dibujo.moveTo(130, 150); dibujo.lineTo(95, 200);
        dibujo.stroke();
    }if (errores >= 7){
        dibujo.beginPath();
        dibujo.moveTo(130, 150); dibujo.lineTo(165, 200);
        dibujo.stroke();
    } 
}

function actualizarVidas() {
    const span = document.getElementById("attempts");
    if (span) {
        span.textContent = lives;
    }
}