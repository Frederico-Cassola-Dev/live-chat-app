<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <title>Title of the document</title>
</head>
<body>
<h1>Chat app</h1>
    <label>
        <input type="text" id="inputLogin" name="inputLogin">
        <button type="submit" id="loginButton">Login</button>
    </label>
<h2 id="connection-status"></h2>
<label>
    <input type="text" id="inputMessage">
    <button type="button" id="sendMessageButton">Send the message</button>
</label>
<h3>Messages</h3>
<ul id="messages-list">
</ul>
</body>
<script src="websocket.js"></script>
</html>
