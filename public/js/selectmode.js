const chickenMode = document.querySelector("#ChickenMode");
chickenMode.addEventListener("click", () => {
    window.location.href = "chicken-mode.html";
})

const normalMode = document.querySelector("#normalMode");
normalMode.addEventListener("click", () => {
    window.location.href = "normal-mode.html";
})

const proMode = document.querySelector("#proMode");
proMode.addEventListener("click", () => {
    window.location.href = "pro-mode.html";
})

const closeMode = document.querySelector("#closeMode");
closeMode.addEventListener("click", () => {
    document.querySelector("#allMode").style.display = "none";
    document.querySelector(".dontknow").style.webkitFilter = "blur(0)";
})