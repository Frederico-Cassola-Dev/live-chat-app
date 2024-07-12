const conn = new WebSocket('ws://localhost:8080');
const connectionStatus = document.getElementById("connection-status");
const inputMessage = document.querySelector("#inputMessage");
const inputLogin = document.querySelector("#inputLogin");
const sendMessageButton = document.querySelector("#sendMessageButton");
const loginButton = document.querySelector("#loginButton");

let username = "";
let message = {};

/*
TODO - Try to send the username into the websocket server
       and after to the db to register
       the user in the websocket server
*/

conn.onmessage = function (e) {
    const list = document.getElementById("messages-list");
    const item = document.createElement("li");

    item.innerText = JSON.parse(e.data).msg + "\n" + new Date(JSON.parse(e.data).date).toLocaleTimeString() + "\n" + JSON.parse(e.data).user;

    list.appendChild(item);
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

loginButton.addEventListener("click", function () {
    // Verify if the connection is established and if the input isn't empty
    if (conn.readyState === 1 && username !== "") {
        connectionStatus.innerText = `Connection established with the user ${username}!`;
        $.ajax({
            type: "POST",
            url: "../controllers/LoginUser.php",
            data: {username: username},
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
            }
        })
    } else {
        connectionStatus.innerText = `Connection failed`;
    }
    inputLogin.value = "";
})
console.log("Connection", conn)

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
    conn.send(JSON.stringify(message));

    inputMessage.value = "";
})
