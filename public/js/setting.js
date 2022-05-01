// Firebase Authenticate
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User: ", user);

        const currentUser = firebase.auth().currentUser;
        document.querySelector("#user-name").innerHTML = currentUser.displayName;
        document.querySelector("#profile-pic").src = currentUser.photoURL;
        refUserList.once('value', snapshot => {
            if (snapshot.child(currentUser.uid).val().gender == "male") {
                document.querySelector("#male").style.opacity = "1";
            } else if (snapshot.child(currentUser.uid).val().gender == "female") {
                document.querySelector("#female").style.opacity = "1";
            }
        });

    } else {
        window.location.href = "/public/index.html";
    }
});

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener("click", () => {
    firebase.auth().signOut();
    console.log("Logout completed.")
})