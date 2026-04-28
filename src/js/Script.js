let word = [];
let secretWord = [];
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
