<?php

global $connection;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    //    $session = $_POST["session"];

    try {
        require_once '../database/dbHandler.php';
        // TODO - Post the user after login into the db ws table to make a group of users with the websocket
        // Ensure $connection is properly initialized
        if (!$connection) {
            throw new Exception('Database connection not initialized');
        }

        $query = 'INSERT INTO ws(username) VALUES(?)';

        $stmt = $connection->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $stmt->close();
        $connection->close();

    } catch (Exception $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../src/index.php");
}
