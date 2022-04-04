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

function readLeaderboard(snapshot) {
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
        }

        n++;

    });
}

refUserList.on("value", (data) => {
    readLeaderboard(data)
});
