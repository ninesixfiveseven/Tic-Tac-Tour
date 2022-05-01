const refUserList = firebase.database().ref("UserList");

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

var currentUserName = ""
var currentUserScore = ""

function readLeaderboard(snapshot) {
    const currentUser = firebase.auth().currentUser;
    var n = 1;
    var all = "";
    snapshot.forEach((data) => {
        document.querySelector("#leader-board").innerHTML = `<thead>
                                                                <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Username</th>
                                                                <th scope="col">TMR</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                ${all}
                                                            </tbody>`;
        
        const username = data.val().name;
        const score = data.val().tmr;

        var table = document.querySelector("#leader-board tbody");
        table.innerHTML += `<tr>
                                <th scope="row">${n}</th>
                                <td>${username}</td>
                                <td>${score}</td>
                            </tr>`;

        all += `<tr>
                    <th scope="row">${n}</th>
                    <td>${username}</td>
                    <td>${score}</td>
                </tr>`;

        if (currentUser.uid == data.key) {
            currentUserName = username;
            currentUserScore = score;
            console.log(score)
            if (300 < score) {
                document.querySelector("#playerRank").innerHTML = "Pro Player";
                console.log(1)
            } else if (100 <= score < 300) {
                document.querySelector("#playerRank").innerHTML = "Normal";
                console.log(2)
            } else if (0 <= score < 100) {
                document.querySelector("#playerRank").innerHTML = "Chicken";
                console.log(2)
            }
        }

        // sort score
        var table, rows, switching, i, x, y, z, shouldSwitch;
        table = document.querySelector("#leader-board");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[1];
                y = rows[i + 1].getElementsByTagName("TD")[1];
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

        // sort score
        for (i = 1; i < (rows.length); i++) {
            z = rows[i].getElementsByTagName("TH")[0];
            z.innerHTML = i;

            if (rows[i].getElementsByTagName("TD")[0].innerHTML == currentUserName) {
                document.querySelector("#rank-of-player").innerHTML = `${i} / ${currentUserName} / ${currentUserScore}`
            }
        }

        n++;

    });
}

refUserList.on("value", (data) => {
    readLeaderboard(data)
});

const btnPlay = document.querySelector("#btnPlay");
btnPlay.addEventListener("click", () => {
    document.querySelector("#allMode").style.display = "flex";
    document.querySelector(".dontknow").style.webkitFilter = "blur(5px)";
})