// Firebase Authenticate
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User: ", user);
    } else {
        window.location.href = "../index.html";
    }
});

refUserList = firebase.database().ref("UserList");
const refChickenRooms = firebase.database().ref("ChickenRooms");

let currentRoom = "";
let currentRoomKey = "";

let slotPlayer1 = " ";
let slotPlayer2 = " ";
let slotPlayer3 = " ";
let slotPlayer4 = " ";

let sumOfPlayer = 0; 

const allSlot = document.querySelectorAll(".slot-player");
allSlot.forEach(slot => slot.addEventListener("click", joinSlot));

function joinSlot(event) {
    const currentUser = firebase.auth().currentUser;
    let currentPlayerClicked = event.currentTarget.id;
    console.log(currentPlayerClicked)

    if (currentPlayerClicked == "slotPlayer1" && slotPlayer1 == " ") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
    }
    if (currentPlayerClicked == "slotPlayer2" && slotPlayer2 == " ") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
    }
    if (currentPlayerClicked == "slotPlayer3" && slotPlayer3 == " ") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
    }
    if (currentPlayerClicked == "slotPlayer4" && slotPlayer4 == " ") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
    } else {
        
    }

}

const allCancelJoin = document.querySelectorAll("#btnCancelJoin");
allCancelJoin.forEach(cancel => cancel.addEventListener("click", cancelJoint));

function cancelJoint(event) {
    const currentUser = firebase.auth().currentUser;
    let cancelThisJoint = event.currentTarget.className
    console.log(cancelThisJoint);

    if (cancelThisJoint == "slotPlayer1" && slotPlayer1 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer2" && slotPlayer2 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer3" && slotPlayer3 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer4" && slotPlayer4 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
    } else {
        
    }
};

function getPlayerAtRoom(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        const roomId = data.val().roomId;        
        if (data.key == currentUser.uid) {
            currentRoom = data.val().atRoom;
            console.log(data.key)
        }
    })
}

function matchIdRoom(snapshot) {
    snapshot.forEach((data) => {
        const roomId = data.val().roomId;        
        if (currentRoom == roomId) {
            currentRoomKey = data.key;
            console.log(currentRoomKey)
            slotPlayer1 = data.val().slotPlayer1;
            slotPlayer2 = data.val().slotPlayer2;
            slotPlayer3 = data.val().slotPlayer3;
            slotPlayer4 = data.val().slotPlayer4;
        }
    })
}

function updateAllSlotPlayer(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        const roomId = data.val().roomId;
        if (data.key == slotPlayer1) {
            document.querySelector("#slotPlayer1").src = data.val().profileURL;
            document.querySelector("#slot-player-name-1").innerHTML = data.val().name;
            if (data.key == currentUser.uid) {
                document.querySelector(".cancelJoin1").style.visibility = "visible";
            }
        }
        if (data.key == slotPlayer2) {
            document.querySelector("#slotPlayer2").src = data.val().profileURL;
            document.querySelector("#slot-player-name-2").innerHTML = data.val().name;
            if (data.key == currentUser.uid) {
                document.querySelector(".cancelJoin2").style.visibility = "visible";
            }
        }
        if (data.key == slotPlayer3) {
            document.querySelector("#slotPlayer3").src = data.val().profileURL;
            document.querySelector("#slot-player-name-3").innerHTML = data.val().name;
            if (data.key == currentUser.uid) {
                document.querySelector(".cancelJoin3").style.visibility = "visible";
            }
        }
        if (data.key == slotPlayer4) {
            document.querySelector("#slotPlayer4").src = data.val().profileURL;
            document.querySelector("#slot-player-name-4").innerHTML = data.val().name;
            if (data.key == currentUser.uid) {
                document.querySelector(".cancelJoin4").style.visibility = "visible";
            }
        }
        if (slotPlayer1 == " ") {
            document.querySelector("#slotPlayer1").src = " ";
            document.querySelector("#slot-player-name-1").innerHTML = "[ว่าง]";
            document.querySelector(".cancelJoin1").style.visibility = "hidden";
        }
        if (slotPlayer2 == " ") {
            document.querySelector("#slotPlayer2").src = " ";
            document.querySelector("#slot-player-name-2").innerHTML = "[ว่าง]";
            document.querySelector(".cancelJoin2").style.visibility = "hidden";
        }
        if (slotPlayer3 == " ") {
            document.querySelector("#slotPlayer3").src = " ";
            document.querySelector("#slot-player-name-3").innerHTML = "[ว่าง]";
            document.querySelector(".cancelJoin3").style.visibility = "hidden";
        }
        if (slotPlayer4 == " ") {
            document.querySelector("#slotPlayer4").src = " ";
            document.querySelector("#slot-player-name-4").innerHTML = "[ว่าง]";
            document.querySelector(".cancelJoin4").style.visibility = "hidden";
        }
    })
}

function updateSlotPlayer(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        refUserList.on("value", (snapshot) => {
            updateAllSlotPlayer(snapshot);
        });
    })
}

function playerInRoom(snapshot) {
    let sumN = 0
    snapshot.forEach((data) => {
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = 0;
        const slotPlayer1 = data.val().slotPlayer1;       
        const slotPlayer2 = data.val().slotPlayer2;       
        const slotPlayer3 = data.val().slotPlayer3;       
        const slotPlayer4 = data.val().slotPlayer4;      
        if (slotPlayer1 != " ") {
            n1 = 1;
        } if (slotPlayer1 == " ") {
            n1 = 0;
        }
        if (slotPlayer2 != " ") {
            n2 = 1;
        } if (slotPlayer2 == " ") {
            n2 = 0;
        }
        if (slotPlayer3 != " ") {
            n3 = 1;
        } if (slotPlayer3 == " ") {
            n3 = 0;
        }
        if (slotPlayer4 != " ") {
            n4 = 1;
        } if (slotPlayer4 == " ") {
            n4 = 0;
        }
        sumN = n1 + n2 + n3 + n4;
        console.log(sumN)
        refChickenRooms.child(currentRoomKey).update({
            numOfPlayer: sumN
        });
        if (sumN == 4) {
            document.querySelector("#btnStart").innerHTML = "Let's Play";
            document.querySelector("#btnStart").disabled  = false;
            refChickenRooms.child(currentRoomKey).update({
                status: "Ready to Play"
            });
        }
        else if (sumN < 4) {
            document.querySelector("#btnStart").innerHTML = "Waiting";
            document.querySelector("#btnStart").disabled  = true;
            console.log(sumN)
            refChickenRooms.child(currentRoomKey).update({
                status: "Waiting"
            });
        }
    })
}

refUserList.on("value", (snapshot) => {
    getPlayerAtRoom(snapshot);
});

refChickenRooms.on("value", (snapshot) => {
    matchIdRoom(snapshot);
    updateSlotPlayer(snapshot);
    playerInRoom(snapshot)
});

firebase.auth().onAuthStateChanged((user) => {

});