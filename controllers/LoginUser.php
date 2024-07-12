<?php

global $connection;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $session = $_POST["session"];

    try {
        require_once "../database/dbHandler.php";
        // TODO - Post the user after login into the db ws table to make a group of users with the websocket

        $query = 'INSERT INTO ws(username, session) VALUES (? , ?)';

        $statement = $connection->prepare($query);
        $statement->bindParam('sssis', $username, $session);

    } catch (Exception $e) {
        die("Query failed: " . $e->getMessage());
    }
}