const conn = new WebSocket('ws://localhost:8080');
const connectionStatus = document.getElementById("connection-status");
const inputMessage = document.querySelector("#inputMessage");
const inputLogin = document.querySelector("#inputLogin");
const sendMessageButton = document.querySelector("#sendMessageButton");
const loginButton = document.querySelector("#loginButton");

const connectionNumber = document.getElementById("connectionNumber");

let username = "";
let message = {};

/*
TODO - Try to send the username into the websocket server
       and after to the db to register
       the user in the websocket server
*/

conn.onmessage = function (e) {
    const {msg, date, user, resourceId} = JSON.parse(e.data);
    const connectionNumber = document.getElementById("connectionNumber");
    const list = document.getElementById("messages-list");
    const item = document.createElement("li");

    connectionNumber.innerText = "Connection number: " + resourceId;

    if (msg) {
        item.innerText = `${msg} \n ${new Date(date).toLocaleTimeString()} \n ${user ? user : "No user"}`;
        list.appendChild(item);
    }
}

inputLogin.addEventListener("input", function (e) {
    username = e.target.value;
})

inputLogin.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        loginButton.click();
    }
})

loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Verify if the connection is established and if the input isn't empty
    if (conn.readyState === 1 && username !== "") {
        connectionStatus.innerText = `Connection established with the user ${username}!`;

        $.ajax({
            type: "POST",
            url: "../controllers/LoginUser.php",
            data: {username: username},
            dataType: "html",
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
            }
        })
    } else {
        connectionStatus.innerText = `Connection failed`;
    }
    inputLogin.value = "";
})

inputMessage.addEventListener("input", function (e) {
    message = {
        msg: e.target.value, date: Date.now(), user: username,
    };
})

inputMessage.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessageButton.click();
    }
})

sendMessageButton.addEventListener("click", function () {
    $.ajax({
        type: "POST",
        url: "../controllers/PostMessage.php",
        data: {username: "user", message: message.msg, connectionNumber: connectionNumber.innerText},
        dataType: "html",
        error: function (xhr, status, error) {
            console.error(xhr, status, error);
        }
    })
    conn.send(JSON.stringify(message));

    inputMessage.value = "";
})
