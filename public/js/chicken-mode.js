const modalCreate = document.querySelector("#modalCreate");
const btnCreate = document.querySelector("#btnCreate");
btnCreate.addEventListener("click", showModalCreate);

function showModalCreate(event) {
    modalCreate.style.display = "flex";
}

const closeModalCreate = document.querySelector("#modalCreate .close");

closeModalCreate.onclick = function() {
    modalCreate.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalCreate) {
        modalCreate.style.display = "none";
        CreateForm.reset();
        CreateFeedback.innerHTML = "";
    } 
}

const refUserList = firebase.database().ref("UserList");
const refChickenRooms = firebase.database().ref("ChickenRooms");

let player1 = "slotPlayer1";
let player2 = "slotPlayer2";
let player3 = "slotPlayer3";
let player4 = "slotPlayer4";


const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", createRoom);

function createRoom(event) {
    event.preventDefault();
    let name = document.querySelector("#input-name-room").value;

    refChickenRooms.push({
        roomId: Math.random().toString().concat("0".repeat(3)).substr(2,3),
        status: "Waiting",
        numOfPlayer: 0,
        name: name,
        [player1]: " ",
        [player2]: " ",
        [player3]: " ",
        [player4]: " ",
    });
}

function readRooms(snapshot) {
    document.querySelector("#rooms-body").innerHTML = "";
    snapshot.forEach((data) => {
        const roomId = data.val().roomId;
        const status = data.val().status;
        const numOfPlayer = data.val().numOfPlayer;
        const name = data.val().name;
        const newDivRoom = `<div id="${roomId}" class="room" onclick="joinRoom(this)">
                                <h2 class="id-room">${roomId}</h2>
                                <h2 class="status-room">${status}</h2>
                                <h2 class="nPlayer-room">${numOfPlayer} / 4</h2>
                                <h2 class="name-room">${name}</h2>
                            </div>`;
        const newElement = document.createRange().createContextualFragment(newDivRoom);
        document.getElementById("rooms-body").appendChild(newElement);
    })
}

refChickenRooms.on("value", (snapshot) => {
    readRooms(snapshot);
});

function joinRoom(event) {
    const currentUser = firebase.auth().currentUser;
    refUserList.child(currentUser.uid).update({
        atRoom: event.id
    });
    console.log(event.id)
    window.location.href = "tournament-chicken.html";
}