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

let tmrPlayer1st = " ";
let tmrPlayer1 = " ";
let tmrPlayer2 = " ";
let tmrPlayer3 = " ";
let tmrPlayer4 = " ";

let statusRoom = " ";
let statusPlaying = " ";
let statusPlayer = " ";

let winnerMatch1 = " ";
let loserMatch1 = " ";
let winnerMatch2 = " ";
let loserMatch2 = " ";
let winnerMatch3 = " ";
let loserMatch3 = " ";

let sumOfPlayer = 0; 
let clickStart = false;

function getPlayerAtRoom(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentUser.uid) {
            currentRoomKey = data.val().atRoom;
            statusPlayer = data.val().status;
        }
    })
}

function getTMRPlayer(snapshot) {
    snapshot.forEach((data) => {
        if (data.key == slotPlayer1) {
            tmrPlayer1 = data.val().tmr;
        }
        if (data.key == slotPlayer2) {
            tmrPlayer2 = data.val().tmr;
        }
        if (data.key == slotPlayer3) {
            tmrPlayer3 = data.val().tmr;
        }
        if (data.key == slotPlayer4) {
            tmrPlayer4 = data.val().tmr;
        }
        if (data.key == slotPlayer1 && statusPlaying == "end") {
            refUserList.child(slotPlayer1).update({
                status: " ",
            });
        }
        if (data.key == slotPlayer2 && statusPlaying == "end") {
            refUserList.child(slotPlayer2).update({
                status: " ",
            });
        }
        if (data.key == slotPlayer3 && statusPlaying == "end") {
            refUserList.child(slotPlayer3).update({
                status: " ",
            });
        }
        if (data.key == slotPlayer4 && statusPlaying == "end") {
            refUserList.child(slotPlayer4).update({
                status: " ",
            });
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
            statusPlaying = data.val().playing;
            if (statusPlaying == "waiting final round") {
                document.querySelector("#btnStart").setAttribute('onclick',  'startFinalMatch();');
            }
            if (statusPlaying == "end") {
                document.querySelector("#btnStart").setAttribute('onclick',  'endMatch();');
            }
            refUserList.on("value", (snapshot) => {
                getTMRPlayer(snapshot);
                console.log(`Old TMR: 1[${tmrPlayer1}], 2[${tmrPlayer2}], 3[${tmrPlayer3}], 4[${tmrPlayer4}]`);
            });
        }
    })
}

const allSlot = document.querySelectorAll(".slot-player");
allSlot.forEach(slot => slot.addEventListener("click", joinSlot));

function joinSlot(event) {
    const currentUser = firebase.auth().currentUser;
    let currentPlayerClicked = event.currentTarget.id;
    console.log(currentPlayerClicked)
    if (currentPlayerClicked == "slotPlayer1" && slotPlayer1 == " " && statusPlayer != "sit") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
        refUserList.child(currentUser.uid).update({
            status: "sit",
        });
    }
    if (currentPlayerClicked == "slotPlayer2" && slotPlayer2 == " "  && statusPlayer != "sit") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
        refUserList.child(currentUser.uid).update({
            status: "sit",
        });
    }
    if (currentPlayerClicked == "slotPlayer3" && slotPlayer3 == " "  && statusPlayer != "sit") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
        refUserList.child(currentUser.uid).update({
            status: "sit",
        });
    }
    if (currentPlayerClicked == "slotPlayer4" && slotPlayer4 == " "  && statusPlayer != "sit") {
        refChickenRooms.child(currentRoomKey).update({
            [currentPlayerClicked]: currentUser.uid,
        });
        refUserList.child(currentUser.uid).update({
            status: "sit",
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
        refUserList.child(currentUser.uid).update({
            status: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer2" && slotPlayer2 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
        refUserList.child(currentUser.uid).update({
            status: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer3" && slotPlayer3 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
        refUserList.child(currentUser.uid).update({
            status: " ",
        });
    }
    if (cancelThisJoint == "slotPlayer4" && slotPlayer4 != " ") {
        sumOfPlayer--
        refChickenRooms.child(currentRoomKey).update({
            [cancelThisJoint]: " ",
        });
        refUserList.child(currentUser.uid).update({
            status: " ",
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
            if (sumN == 4 && statusPlaying != "end" && statusPlaying != "rouud1") {
                document.querySelector("#btnStart").innerHTML = "Let's Play";
                document.querySelector("#btnStart").disabled  = false;
                refChickenRooms.child(currentRoomKey).update({
                    status: "Ready to Play",
                });
            }
            if (sumN == 4 && statusPlaying == "rouud1") {
                console.log(statusPlaying)
                refChickenRooms.child(currentRoomKey).update({
                    status: "Playing",
                });
            }
            if (sumN == 4 && statusPlaying == "end") {
                console.log(statusPlaying)
                document.querySelector("#btnStart").innerHTML = "End Room";
                document.querySelector("#btnStart").disabled  = false;
            }
            else if (0 <= sumN && sumN < 4) {
                document.querySelector("#btnStart").innerHTML = "Waiting";
                document.querySelector("#btnStart").disabled  = true;
                refChickenRooms.child(currentRoomKey).update({
                    status: "Waiting",
                });
            }
        }   
    })
}

function startMatch() {
    refChickenRooms.child(currentRoomKey).update({
        playing: "round1",
        status: "Playing"
    });
    refChickenRooms.child(currentRoomKey).child("Match1").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer1,
        playerO: slotPlayer2,
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
    refChickenRooms.child(currentRoomKey).child("Match2").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer3,
        playerO: slotPlayer4,
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
    refChickenRooms.child(currentRoomKey).child("Match3").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer2nd,
        playerO: slotPlayer3rd,
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
}

function startFinalMatch() {
    refChickenRooms.child(currentRoomKey).update({
        playing: "final round"
    });
    refChickenRooms.child(currentRoomKey).child("Match3").update({
        roomKey: currentRoomKey,
        playerX: slotPlayer2nd,
        playerO: slotPlayer3rd,
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
}

function getWinnerLoserOfMatch(snapshot) {
    snapshot.forEach((data) => {
        if (currentRoomKey == data.key) {
            winnerMatch1 = data.val().Match1.winner;
            loserMatch1 = data.val().Match1.loser;
            winnerMatch2 = data.val().Match2.winner;
            loserMatch2 = data.val().Match2.loser;
            winnerMatch3 = data.val().Match3.winner;
            loserMatch3 = data.val().Match3.loser;
            console.log("in")
        }
    })
}

function endMatch() {
    let updateTMR1st = tmrPlayer1st + 10;
    refUserList.child(slotPlayer1st).update({
        tmr: updateTMR1st,
    });
    refChickenRooms.child(currentRoomKey).update({
        playing: "remove"
    });
}

function removeMatch(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (currentRoomKey == data.key) {
            if (data.val().playing == "remove") {
                refChickenRooms.child(currentRoomKey).remove();
                window.location.href = "home.html";
            }
        }
    })
}

function createMatch(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (currentRoomKey == data.key) {
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
        }
    })
}

function createFinalMatch(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (currentRoomKey == data.key) {
            if (data.val().playing == "final round") {
                if (data.val().Match3.playerX == currentUser.uid && data.val().playing == "final round") {
                    window.location.href = "match-3-chicken.html";
                }
                if (data.val().Match3.playerO == currentUser.uid && data.val().playing == "final round") {
                    window.location.href = "match-3-chicken.html";
                }
            }
        }
    })
}

function whoIsWinerRound1(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            if (slotPlayer1 == data.val().Match1.winner) {
                slotPlayer2nd = slotPlayer1;
                // tmrPlayer2nd = tmrPlayer1;
                document.querySelector("#slotPlayer2").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer2).update({
                //         tmr: tmrPlayer2 -= 5,
                //     });
                // }
            }
            if (slotPlayer2 == data.val().Match1.winner) {
                slotPlayer2nd = slotPlayer2;
                // tmrPlayer2nd = tmrPlayer2;
                document.querySelector("#slotPlayer1").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer1).update({
                //         tmr: tmrPlayer1 -= 5,
                //     });
                // }
            }
            if (slotPlayer3 == data.val().Match2.winner) {
                slotPlayer3rd = slotPlayer3;
                // tmrPlayer3rd = tmrPlayer3;
                document.querySelector("#slotPlayer4").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer4).update({
                //         tmr: tmrPlayer4 -= 5,
                //     });
                // }
            }
            if (slotPlayer4 == data.val().Match2.winner) {
                slotPlayer3rd = slotPlayer4;
                // tmrPlayer3rd = tmrPlayer4;
                document.querySelector("#slotPlayer3").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer3).update({
                //         tmr: tmrPlayer3 -= 5,
                //     });
                // }
            }
            refUserList.on("value", (snapshot) => {
                updateTourLine(snapshot);
            });
        }
    })
}

function whoIsFinalWiner(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        if (data.key == currentRoomKey) {
            if (slotPlayer2nd == data.val().Match3.winner && statusPlaying == "end") {
                slotPlayer1st = slotPlayer2nd;
                // tmrPlayer1st = tmrPlayer2nd;
                document.querySelector("#slot-player-3rd").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer3rd).update({
                //         tmr:  tmrPlayer3rd += 5,
                //     });
                //     refUserList.child(slotPlayer1st).update({
                //         tmr:  tmrPlayer1st += 10,
                //     });
                // }
            }
            if (slotPlayer3rd == data.val().Match3.winner && statusPlaying == "end") {
                slotPlayer1st = slotPlayer3rd;
                // tmrPlayer1st = tmrPlayer3rd;
                document.querySelector("#slot-player-2nd").style.filter = "grayscale(100%)";
                // if (statusPlaying == "end") {
                //     refUserList.child(slotPlayer2nd).update({
                //         tmr:  tmrPlayer2nd += 5,
                //     });
                //     refUserList.child(slotPlayer1st).update({
                //         tmr:  tmrPlayer1st += 10,
                //     });
                // }
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
            document.querySelector(".cancelJoin2").style.visibility = "hidden";
        }
        if (data.key == slotPlayer3rd) {
            document.querySelector("#slot-player-3rd").src = data.val().profileURL;
            document.querySelector("#slot-player-name-3rd").innerHTML = data.val().name;
            document.querySelector(".cancelJoin3").style.visibility = "hidden";
            document.querySelector(".cancelJoin4").style.visibility = "hidden";
        }
        if (data.key == slotPlayer1st) {
            document.querySelector("#slot-player-1st").src = data.val().profileURL;
            document.querySelector("#slot-player-name-1st").innerHTML = data.val().name;
            document.querySelector(".cancelJoin1").style.visibility = "hidden";
            document.querySelector(".cancelJoin2").style.visibility = "hidden";
            document.querySelector(".cancelJoin3").style.visibility = "hidden";
            document.querySelector(".cancelJoin4").style.visibility = "hidden";
            tmrPlayer1st = data.val().tmr;
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
    getWinnerLoserOfMatch(snapshot);
    createMatch(snapshot);
    whoIsWinerRound1(snapshot);
    createFinalMatch(snapshot);
    whoIsFinalWiner(snapshot);
    removeMatch(snapshot);
});