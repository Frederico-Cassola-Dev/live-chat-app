const conn = new WebSocket('ws://localhost:8080');
const connectionStatus = document.getElementById("connection-status");
const inputMessage = document.querySelector("#inputMessage");
const inputLogin = document.querySelector("#inputLogin");
const sendMessageButton = document.querySelector("#sendMessageButton");
const loginButton = document.querySelector("#loginButton");

let username = "";

conn.onopen = function (e) {
    console.log("This is the event from onopen", e);
    connectionStatus.innerText = "Connection established!";
    /*
    TODO - Try to send the username into the websocket server
           and after to the db to register
           the user in the websocket server
   */
};

conn.onmessage = function (e) {
    console.log("Event from onmessage", e);

    const list = document.getElementById("messages-list");
    const item = document.createElement("li");

    item.innerText = JSON.parse(e.data).msg + "\n" + new Date(JSON.parse(e.data).date).toLocaleTimeString();
    list.appendChild(item);
};

inputLogin.addEventListener("input", function (e) {
    username = e.target.value;
    console.log(username);
})

inputLogin.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessageButton.click();
    }
})
loginButton.addEventListener("click", function () {
    conn.send(JSON.stringify({
        user: username, session: "test"
    }));
    inputLogin.value = "";
})

let message = {};

inputMessage.addEventListener("input", function (e) {
    message = {
        msg: e.target.value, date: Date.now(),
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
