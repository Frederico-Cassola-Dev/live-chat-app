// let conn = new WebSocket('ws://localhost:8080');
let conn = null;
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

const openConnectionButton = document.getElementById("openConnectionButton");
openConnectionButton.addEventListener("click", function () {
  conn.close();
  conn = new WebSocket('ws://localhost:8080');
  connectionStatus.innerText = `Connection open`;
  console.log("Second Connection opened", conn);
  conn.onmessage = function (event) {
    const { resourceId } = JSON.parse(event.data);
    console.log(JSON.stringify(event.data));
    connectionNumber.innerText = "Connection number: " + resourceId;
  }
})
// while (conn == null) {
// console.log("inside the while loop")
if (conn != null) {

  conn.onmessage = function (event) {
    console.log("Message received: ", JSON.parse(event.data));
    const { data, date, user, resourceId, from_resourceId } = JSON.parse(event.data);
    const list = document.getElementById("messages-list");
    const item = document.createElement("li");
    connectionNumber.innerText = "Connection number: " + resourceId;

    if (data) {
      item.innerText = `${data.msg} \n ${new Date(date).toLocaleTimeString()} \n ${user ? user : "No user"} \n From user: ${from_resourceId}`;
      list.appendChild(item);
    }
  }
}
// }

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
  if (username !== "") {
    conn = new WebSocket('ws://localhost:8080');
    connectionStatus.innerText = `Connection established with the user ${username}!`;

    $.ajax({
      type: "POST",
      url: "../controllers/LoginUser.php",
      data: { username: username, status: true },
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
    type: "POST", url: "../controllers/PostMessage.php",
    data: {
      msg: message.msg,
      userId: 1,
      conversationId: 22,
    }, dataType: "html", error: function (xhr, status, error) {
      console.error(xhr, status, error);
    }
  })
  conn.send(JSON.stringify(message));

  inputMessage.value = "";
})

const closeConnectionButton = document.getElementById("closeConnectionButton");
closeConnectionButton.addEventListener("click", function () {
  conn.close();
  connectionStatus.innerText = `Connection closed`;
  connectionNumber.innerText = "Connection number: No Status";
})


// conn.on("message", function (event) {
//     console.log("Received message", event.data);
// })
//
// addEventListener("message", function (event) {
//     console.log("Message received: ", event.data);
//
// })
