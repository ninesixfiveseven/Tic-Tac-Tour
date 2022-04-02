// Firebase Authenticate
firebase.auth().onAuthStateChanged((user) => {
    console.log("User: ", user);
});

const img = document.querySelector("#profile-pic");
let pic = "";
let fileImg = {};

const file = document.querySelector("#file");
file.addEventListener("change", function(){
    const choosedFile = this.files[0];
    fileImg = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function(){
            img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
    }
});

const refUserList = firebase.database().ref("UserList");

const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", createProfile);

function createProfile(event) {
    event.preventDefault();
    const currentUser = firebase.auth().currentUser;
    let name = document.querySelector("#input-name").value;

    refUserList.child(currentUser.uid).update({
        name: name,
        tmr: 0,
        played: 0,
        win: 0,
        lose: 0
    });

    firebase.storage().ref("users/" + currentUser.uid + "/profile.jpg").put(fileImg).then(function () {
        console.log("Uploaded")
        firebase.storage().ref("users/" + currentUser.uid + "/profile.jpg").getDownloadURL().then(imgURL => {
            pic = imgURL
            console.log("GetUrl")

            currentUser.updateProfile({
                displayName: name,
                photoURL: pic
            }).then(() => {
                console.log("Update complete!")
            }).catch((error) => {
        
            });
        });
    });
}