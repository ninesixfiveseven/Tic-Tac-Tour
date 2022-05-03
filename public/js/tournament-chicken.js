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

let slotPlayer1st = " ";
let slotPlayer2nd = " ";
let slotPlayer3rd = " ";
let slotPlayer1 = " ";
let slotPlayer2 = " ";
let slotPlayer3 = " ";
let slotPlayer4 = " ";

let statusRoom = " ";

let sumOfPlayer = 0; 

function getPlayerAtRoom(snapshot) {
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
            slotPlayer1 = data.val().slotPlayer1;
            slotPlayer2 = data.val().slotPlayer2;
            slotPlayer3 = data.val().slotPlayer3;
            slotPlayer4 = data.val().slotPlayer4;
            statusRoom = data.val().status;
        }
    })
}

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
    snapshot.forEach((data) => {
        let sumN = 0
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = 0;
        const slotPlayer1 = data.val().slotPlayer1;       
        const slotPlayer2 = data.val().slotPlayer2;       
        const slotPlayer3 = data.val().slotPlayer3;       
        const slotPlayer4 = data.val().slotPlayer4;
        if (currentRoomKey == data.key) {
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
                refChickenRooms.child(currentRoomKey).update({
                    status: "Waiting"
                });
            }
        }   
    })
}

function startMatch() {
    let row1col1 = 'row-1-col-1'
    let row1col2 = 'row-1-col-2'
    let row1col3 = 'row-1-col-3'
    let row2col1 = 'row-2-col-1'
    let row2col2 = 'row-2-col-2'
    let row2col3 = 'row-2-col-3'
    let row3col1 = 'row-3-col-1'
    let row3col2 = 'row-3-col-2'
    let row3col3 = 'row-3-col-3'
    refChickenRooms.child(currentRoomKey).update({
        playing: "round1"
    });
    refChickenRooms.child(currentRoomKey).child("Match1").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer1,
        playerO: slotPlayer2,
        [row1col1]: " ",
        [row1col2]: " ",
        [row1col3]: " ",
        [row2col1]: " ",
        [row2col2]: " ",
        [row2col3]: " ",
        [row3col1]: " ",
        [row3col2]: " ",
        [row3col3]: " ",
        turn: "X"
    });
    refChickenRooms.child(currentRoomKey).child("Match2").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer3,
        playerO: slotPlayer4,
        [row1col1]: " ",
        [row1col2]: " ",
        [row1col3]: " ",
        [row2col1]: " ",
        [row2col2]: " ",
        [row2col3]: " ",
        [row3col1]: " ",
        [row3col2]: " ",
        [row3col3]: " ",
        turn: "X"
    });
}

function createMatch(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.val().Match1.playerX == currentUser.uid && data.val().playing == "round1") {
            window.location.href = "match-1-chicken.html";
        }
        if (data.val().Match1.playerO == currentUser.uid && data.val().playing == "round1") {
            window.location.href = "match-1-chicken.html";
        }
        if (data.val().Match2.playerX == currentUser.uid && data.val().playing == "round1") {
            window.location.href = "match-2-chicken.html";
        }
        if (data.val().Match2.playerO == currentUser.uid && data.val().playing == "round1") {
            window.location.href = "match-2-chicken.html";
        }
    })
}

function whoIsWinerRound1(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            if (slotPlayer1 == data.val().Match1.winner) {
                slotPlayer2nd = slotPlayer1;
                document.querySelector("#slotPlayer2").style.filter = "grayscale(100%)";
            }
            if (slotPlayer2 == data.val().Match1.winner) {
                slotPlayer2nd = slotPlayer2;
                document.querySelector("#slotPlayer1").style.filter = "grayscale(100%)";
            }
            refUserList.on("value", (snapshot) => {
                updateTourLine(snapshot);
            });
        }
    })
}

function updateTourLine(snapshot) {
    snapshot.forEach((data) => {
        if (data.key == slotPlayer2nd) {
            document.querySelector("#slot-player-2nd").src = data.val().profileURL;
            document.querySelector("#slot-player-name-2nd").innerHTML = data.val().name;
            document.querySelector(".cancelJoin1").style.visibility = "hidden";
            console.log(slotPlayer2nd);
        }
    })
}

refUserList.on("value", (snapshot) => {
    getPlayerAtRoom(snapshot);
});

refChickenRooms.on("value", (snapshot) => {
    matchIdRoom(snapshot);
    updateSlotPlayer(snapshot);
    playerInRoom(snapshot);
    createMatch(snapshot);
    whoIsWinerRound1(snapshot)
});