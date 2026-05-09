document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("button_easy").addEventListener("click", () => {
        if (!validarNombre()) return;
        localStorage.setItem("difficulty", "easy");
        window.location.href = "ahorcado.html";
    });

    document.getElementById("button_medium").addEventListener("click", () => {
        if (!validarNombre()) return;
        localStorage.setItem("difficulty", "medium");
        window.location.href = "ahorcado.html";
    });

    document.getElementById("button_hard").addEventListener("click", () => {
        if (!validarNombre()) return;
        localStorage.setItem("difficulty", "hard");
        window.location.href = "ahorcado.html";
    });


    document.getElementById("nombre").addEventListener("input", () => {
        document.getElementById("error").style.display = "none";
    });
});


function validarNombre() {
    const nombre = document.getElementById("nombre").value.trim();
    const error  = document.getElementById("error");

    if (!nombre) {
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    sessionStorage.setItem("jugador", nombre);
    return true;
}