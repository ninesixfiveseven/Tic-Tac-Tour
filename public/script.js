const modalLogin = document.querySelector("#modalLogin");
const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", showModalLogin);

function showModalLogin(event) {
    modalLogin.style.display = "flex";
}

const closeModalLogin = document.querySelector("#modalLogin .close");

closeModalLogin.onclick = function() {
    modalLogin.style.display = "none";
}

const modalSignup = document.querySelector("#modalSignup");
const btnSignup = document.querySelector("#btnSignup");
btnSignup.addEventListener("click", showModalSignup);

function showModalSignup(event) {
    modalSignup.style.display = "flex";
}

const closemodalSignup = document.querySelector("#modalSignup .close");

closemodalSignup.onclick = function() {
    modalSignup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalLogin) {
      modalLogin.style.display = "none";
    } else if (event.target == modalSignup) {
        modalSignup.style.display = "none";
    }
}