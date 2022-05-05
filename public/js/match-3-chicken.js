
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
let tmrPlayerX = 0;
let tmrPlayerO = 0;
let playerXLose = 0;
let playerOLose = 0;
let playerXWin = 0;
let playerOWin = 0;

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
            playerX = data.val().Match3.playerX;
            playerO = data.val().Match3.playerO;
            turn = data.val().Match3.turn;
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
        const currentUser = firebase.auth().currentUser;
        if (data.key == playerX) {
            document.querySelector("#profile-pic-x").src = data.val().profileURL;
            tmrPlayerX = data.val().tmr;
            console.log(`Old TMR: PlayerX[${tmrPlayerX}], PlayerO[${tmrPlayerO}]`);
            if (playerX == currentUser.uid) {
                document.querySelector("#user-name-x").innerHTML = `${data.val().name} (ME)`;
            } else {
                document.querySelector("#user-name-x").innerHTML = data.val().name;
            }
        }
        if (data.key == playerO) {
            document.querySelector("#profile-pic-o").src = data.val().profileURL;
            tmrPlayerO = data.val().tmr;
            console.log(`Old TMR: PlayerX[${tmrPlayerX}], PlayerO[${tmrPlayerO}]`);
            if (playerO == currentUser.uid) {
                document.querySelector("#user-name-o").innerHTML = `(ME) ${data.val().name}`;
            } else {
                document.querySelector("#user-name-o").innerHTML = data.val().name;
            }
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
        refChickenRooms.child(currentRoomKey).child("Match3").update({
            [presentCol]: "X",
            turn: "O"
        });
    } else if (onThisCol.innerHTML == " " && playerO == currentUser.uid  && turn == "O") {
        console.log(event.currentTarget.getAttribute('id'));
        let presentCol = event.currentTarget.getAttribute('id');
        refChickenRooms.child(currentRoomKey).child("Match3").update({
            [presentCol]: "O",
            turn: "X"
        });
    }
    
}

function readXOTable(snapshot) {
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            console.log("Read")
            document.querySelector("#row1col1").childNodes[0].innerHTML = data.val().Match3.row1col1;
            gameState[0] = data.val().Match3.row1col1;
            document.querySelector("#row1col2").childNodes[0].innerHTML = data.val().Match3.row1col2;
            gameState[1] = data.val().Match3.row1col2;
            document.querySelector("#row1col3").childNodes[0].innerHTML = data.val().Match3.row1col3;
            gameState[2] = data.val().Match3.row1col3;
            document.querySelector("#row2col1").childNodes[0].innerHTML = data.val().Match3.row2col1;
            gameState[3] = data.val().Match3.row2col1;
            document.querySelector("#row2col2").childNodes[0].innerHTML = data.val().Match3.row2col2;
            gameState[4] = data.val().Match3.row2col2;
            document.querySelector("#row2col3").childNodes[0].innerHTML = data.val().Match3.row2col3;
            gameState[5] = data.val().Match3.row2col3;
            document.querySelector("#row3col1").childNodes[0].innerHTML = data.val().Match3.row3col1;
            gameState[6] = data.val().Match3.row3col1;
            document.querySelector("#row3col2").childNodes[0].innerHTML = data.val().Match3.row3col2;
            gameState[7] = data.val().Match3.row3col2;
            document.querySelector("#row3col3").childNodes[0].innerHTML = data.val().Match3.row3col3;
            gameState[8] = data.val().Match3.row3col3;
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

function resetBoard() {
    refChickenRooms.child(currentRoomKey).child("Match3").update({
        row1col1: " ",
        row1col2: " ",
        row1col3: " ",
        row2col1: " ",
        row2col2: " ",
        row2col3: " ",
        row3col1: " ",
        row3col2: " ",
        row3col3: " ",
        turn: "X",
        winner: " ",
        loser: " "
    });
    gameState = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
}

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
            playerXLose = tmrPlayerX+5;
            playerOLose = tmrPlayerO+5;
            playerXWin = tmrPlayerX+10;
            playerOWin = tmrPlayerO+10;
            break
        }
    }

    if (roundWon) {
        document.querySelector('#displayGuide').innerHTML = `Winner: ${winner}`;
        if (playerX == currentUser.uid && winner == "X") {
            refUserList.child(playerX).update({
                tmr: playerXWin,
            });
            refChickenRooms.child(currentRoomKey).child("Match3").update({
                winner: playerX,
                loser: playerO
            });
            refUserList.child(playerO).update({
                tmr: playerOLose,
            });
        } else if (playerO == currentUser.uid && winner == "O") {
            refUserList.child(playerX).update({
                tmr: playerOWin,
            });
            refChickenRooms.child(currentRoomKey).child("Match3").update({
                winner: playerO,
                loser: playerX
            });
            refUserList.child(playerX).update({
                tmr: playerXLose,
            });
        }
        return;
    }

    let roundDraw = !gameState.includes(" ");
    if (roundDraw) {
        document.querySelector('#displayGuide').innerHTML = "GAME DRAW";
        setTimeout(resetBoard, 2000);
        return;
    }
}

function whoIsWinAndLose(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            if (currentUser.uid == data.val().Match3.winner) {
                refChickenRooms.child(currentRoomKey).update({
                    playing: "end"
                });
                window.location.href = "tournament-chicken.html";
            }
            if (currentUser.uid == data.val().Match3.loser) {
                refChickenRooms.child(currentRoomKey).update({
                    playing: "end"
                });
                window.location.href = "tournament-chicken.html";
            }
        }
    })
}

refUserList.on("value", (snapshot) => {
    getPlayerXY(snapshot);
    updatePlayerXO(snapshot);
});

