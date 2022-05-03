
// Firebase Authenticate
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User: ", user);
    } else {
        window.location.href = "../index.html";
    }
});

const refUserList = firebase.database().ref("UserList");
const refChickenRooms = firebase.database().ref("ChickenRooms");

let currentRoomKey = "";

let playerX = "";
let playerY = "";

function getPlayerXY(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentUser.uid) {
            currentRoomKey = data.val().atRoom;
        }
    })
}

function matchIdRoom(snapshot) {
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            playerX = data.val().Match2.playerX;
            playerY = data.val().Match2.playerY;
            console.log(playerX)
            console.log(playerY)
        }
    })
}

refChickenRooms.on("value", (snapshot) => {
    matchIdRoom(snapshot);
});

function updatePlayerXY(snapshot) {
    refChickenRooms.on("value", (snapshot) => {
        matchIdRoom(snapshot);
    });
    snapshot.forEach((data) => {
        console.log(`${data.key} // ${playerX}`)
        if (data.key == playerX) {
            document.querySelector("#profile-pic-x").src = data.val().profileURL;
            document.querySelector("#user-name-x").innerHTML = data.val().name;
        }
        if (data.key == playerY) {
            document.querySelector("#profile-pic-y").src = data.val().profileURL;
            document.querySelector("#user-name-y").innerHTML = data.val().name;
        }
    })
}

refUserList.on("value", (snapshot) => {
    getPlayerXY(snapshot);
    updatePlayerXY(snapshot);
});
