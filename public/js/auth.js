// All Modal
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
    signupForm.reset();
    signupFeedback.innerHTML = "";
}

window.onclick = function(event) {
    if (event.target == modalLogin) {
        modalLogin.style.display = "none";
        loginForm.reset();
        loginFeedback.innerHTML = "";
    } else if (event.target == modalSignup) {
        modalSignup.style.display = "none";
        signupForm.reset();
        signupFeedback.innerHTML = "";
    }
}

// Signup
const signupForm = document.querySelector("#signup-form");
const signupFeedback = document.querySelector("#feedback-msg-signup");
signupForm.addEventListener("submit", createUser);

function createUser(event) {
    event.preventDefault();
    const email = signupForm["input-email-signup"].value;
    const password = signupForm["input-password-signup"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        signupFeedback.style = `color:green`;
        signupFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Signup completed`;
        setTimeout(function(){modalSignup.style.display = "none";}, 1000);
        signupForm.reset();
        signupFeedback.innerHTML = "";
    })
    .catch((error) => {
        signupFeedback.style = `color:crimson`;
        signupFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
        signupForm.reset();
    });
}

// Login
const loginForm = document.querySelector("#login-form");
const loginFeedback = document.querySelector("#feedback-msg-login");
loginForm.addEventListener("submit", loginUser);

function loginUser(event) {
    event.preventDefault();
    const email = loginForm["input-email-login"].value;
    const password = loginForm["input-password-login"].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        loginFeedback.style = `color:green`;
        loginFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Login successed.`;
        setTimeout(function(){modalLogin.style.display = "none";}, 1000);
        loginForm.reset();
        loginFeedback.innerHTML = "";
    })
    .catch((error) => {
        loginFeedback.style = `color:crimson`;
        loginFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
        loginForm.reset();
    });
}

// Google Signin
const singninGoogle = document.querySelectorAll("#btnGoogle")
singninGoogle.forEach(btnGoogle => btnGoogle.addEventListener("click", googleSignin))

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // ...
        loginFeedback.style = `color:green`;
        loginFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Login successed.`
        setTimeout(function(){loginModal.hide()}, 1000);
        loginForm.reset();
        loginFeedback.innerHTML = "";
        
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

// Firebase Authenticate
firebase.auth().onAuthStateChanged((user) => {
    console.log("User: ", user);
    console.log("Init");
    //window.open("/public/createprofile.html" , '_blank');
    window.location.href = "create-profile.html";
});