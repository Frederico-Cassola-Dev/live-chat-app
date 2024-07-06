const conn = new WebSocket('ws://localhost:8080');
const connectionStatus = document.getElementById("connection-status");
const inputMessage = document.querySelector("#inputMessage")
const sendMessageButton = document.querySelector("#sendMessageButton")

conn.onopen = function (e) {
    console.log("This is the e from onopen", e);
    connectionStatus.innerText = "Connection established!";
    console.log(conn.onopen);
};

conn.onmessage = function (e) {
    console.log("Event from onmessage", e);

    const list = document.getElementById("messages-list");
    const item = document.createElement("li");

    item.innerText = JSON.parse(e.data).msg+ "\n" + new Date(JSON.parse(e.data).date).toLocaleTimeString();
    list.appendChild(item);
};

let message = {};

addEventListener("input", function (e) {
    message = {
        msg: e.target.value,
        date: Date.now(),
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
