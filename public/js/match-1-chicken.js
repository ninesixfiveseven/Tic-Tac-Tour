
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
let playerO = "";
let turn = "";
let gameState = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

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
            playerX = data.val().Match1.playerX;
            playerO = data.val().Match1.playerO;
            turn = data.val().Match1.turn;
            document.querySelector("#displayGuide").innerHTML = `Turn: ${turn}`;
        }
    })
}

refChickenRooms.on("value", (snapshot) => {
    matchIdRoom(snapshot);
});

function updatePlayerXO(snapshot) {
    refChickenRooms.on("value", (snapshot) => {
        matchIdRoom(snapshot);
        readXOTable(snapshot);
        matchChecking(gameState);
        whoIsWinAndLose(snapshot);
    });
    snapshot.forEach((data) => {
        if (data.key == playerX) {
            document.querySelector("#profile-pic-x").src = data.val().profileURL;
            document.querySelector("#user-name-x").innerHTML = data.val().name;
        }
        if (data.key == playerO) {
            document.querySelector("#profile-pic-o").src = data.val().profileURL;
            document.querySelector("#user-name-o").innerHTML = data.val().name;
        }
    })
}

const Cols = document.querySelectorAll('.col');
Cols.forEach(col => col.addEventListener('click', handleColClick));

function handleColClick(event) {
    const currentUser = firebase.auth().currentUser;
    let onThisCol = event.currentTarget.childNodes[0];    
    if (onThisCol.innerHTML == " " && playerX == currentUser.uid && turn == "X") {
        let presentCol = event.currentTarget.getAttribute('id');
        refChickenRooms.child(currentRoomKey).child("Match1").update({
            [presentCol]: "X",
            turn: "O"
        });
    } else if (onThisCol.innerHTML == " " && playerO == currentUser.uid  && turn == "O") {
        console.log(event.currentTarget.getAttribute('id'));
        let presentCol = event.currentTarget.getAttribute('id');
        refChickenRooms.child(currentRoomKey).child("Match1").update({
            [presentCol]: "O",
            turn: "X"
        });
    }
    
}

function readXOTable(snapshot) {
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            console.log("Read")
            document.querySelector("#row1col1").childNodes[0].innerHTML = data.val().Match1.row1col1;
            gameState[0] = data.val().Match1.row1col1;
            document.querySelector("#row1col2").childNodes[0].innerHTML = data.val().Match1.row1col2;
            gameState[1] = data.val().Match1.row1col2;
            document.querySelector("#row1col3").childNodes[0].innerHTML = data.val().Match1.row1col3;
            gameState[2] = data.val().Match1.row1col3;
            document.querySelector("#row2col1").childNodes[0].innerHTML = data.val().Match1.row2col1;
            gameState[3] = data.val().Match1.row2col1;
            document.querySelector("#row2col2").childNodes[0].innerHTML = data.val().Match1.row2col2;
            gameState[4] = data.val().Match1.row2col2;
            document.querySelector("#row2col3").childNodes[0].innerHTML = data.val().Match1.row2col3;
            gameState[5] = data.val().Match1.row2col3;
            document.querySelector("#row3col1").childNodes[0].innerHTML = data.val().Match1.row3col1;
            gameState[6] = data.val().Match1.row3col1;
            document.querySelector("#row3col2").childNodes[0].innerHTML = data.val().Match1.row3col2;
            gameState[7] = data.val().Match1.row3col2;
            document.querySelector("#row3col3").childNodes[0].innerHTML = data.val().Match1.row3col3;
            gameState[8] = data.val().Match1.row3col3;
        }
    })
}

// Conditions of winning.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check result who's win.
function matchChecking(gameState) {
    const currentUser = firebase.auth().currentUser;
    let winner = ""

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === ' ' || b === ' ' || c === ' ') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winner = b;
            break
        }
    }

    if (roundWon) {
        document.querySelector('#displayGuide').innerHTML = `Winner: ${winner}`;
        if (playerX == currentUser.uid && winner == "X") {
            refChickenRooms.child(currentRoomKey).child("Match1").update({
                winner: playerX,
                loser: playerO
            });
        } else if (playerO == currentUser.uid && winner == "O") {
            refChickenRooms.child(currentRoomKey).child("Match1").update({
                winner: playerO,
                loser: playerX
            });
        }
        return;
    }

    let roundDraw = !gameState.includes(" ");
    if (roundDraw) {
        document.querySelector('#displayGuide').innerHTML = "GAME DRAW";
        refChickenRooms.child(currentRoomKey).child("Match1").update({
            winner: "draw",
        });
        return;
    }
}

function whoIsWinAndLose(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            if (currentUser.uid == data.val().Match1.winner) {
                refChickenRooms.child(currentRoomKey).update({
                    playing: "waiting"
                });
                window.location.href = "tournament-chicken.html";
            }
            if (currentUser.uid == data.val().Match1.loser) {
                refChickenRooms.child(currentRoomKey).update({
                    playing: "waiting"
                });
                window.location.href = "../index.html";
            }
        }
    })
}

refUserList.on("value", (snapshot) => {
    getPlayerXY(snapshot);
    updatePlayerXO(snapshot);
});

