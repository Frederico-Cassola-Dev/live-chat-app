<?php

global $connection;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $msg = $_POST['msg'];
    $userId = $_POST["userId"];
    $conversationId = $_POST['conversationId'];

    try {
        require_once '../database/dbHandler.php';
        // TODO - Post the user after login into the db ws table to make a group of users with the websocket
        // Ensure $connection is properly initialized
        if (!$connection) {
            throw new Exception('Database connection not initialized');
        }

        $query = 'INSERT INTO messages(msg, user_id, conversation_id) VALUES(?,?,?)';

        $stmt = $connection->prepare($query);
        $stmt->bind_param("sii", $msg, $conversationId, $userId);
        $stmt->execute();

        $stmt->close();
        $connection->close();

    } catch (Exception $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../src/index.php");
}
