document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("button_easy").addEventListener("click", () => {
        localStorage.setItem("difficulty", "easy");
        window.location.href = "ahorcado.html";
    });

    document.getElementById("button_medium").addEventListener("click", () => {
        localStorage.setItem("difficulty", "medium");
        window.location.href = "ahorcado.html";
    });

    document.getElementById("button_hard").addEventListener("click", () => {
        localStorage.setItem("difficulty", "hard");
        window.location.href = "ahorcado.html";
    });

});


function loadNewWords() {
    document.getElementById("news_words").addEventListener("click", () => {
        window.location.href = "new_words.html";
    });
}