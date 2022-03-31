var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalLogin.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
  }
}

const modalLogin = document.querySelector("#modalLogin");
const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", showModalLogin);

function showModalLogin(event) {
    console.log("1")
    modalLogin.style.display = "flex";
}
