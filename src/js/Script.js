let word = "";
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

async function GAmeStart(dificulty) {
    Word = await giveWord(dificulty);
    secretWord = Word.split("");
    guessedLetters = [];
    botonesGEnrados
}

function botonesGEnrados() {
    const abecedary = "abcdefghijklmnopqrstuvwxyz";
    const container = document.querySelector(".buttons-container");
    abecedary.split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;

        buttion.addEventListener("click", () => {
            if (guessedLetters.includes(letter)) return;

            guessedLetters.push(letter);
            button.disabled = true;
            
            if (!word.includes(letter)) {
                lives--;
            }
        });
        container.appendChild(button); 
    });
}