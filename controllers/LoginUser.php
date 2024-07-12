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
//
//session_start(); // Start the session if not already started
//error_reporting(E_ALL); // Enable error reporting for debugging
//ini_set('display_errors', 1);
//
//global $connection;
//echo "hello from LoginUser<br>";
//
//if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
//    if (isset($_POST['inputLogin'])) {
//        $username = trim($_POST['inputLogin']); // Sanitize user input
//        echo "hello from inside LoginUser<br>";
//
//        try {
//            require_once '../database/dbHandler.php';
//
//            // Ensure $connection is properly initialized
//            if (!$connection) {
//                throw new Exception('Database connection not initialized');
//            }
//
//            // Prepare and execute the query
//            $query = 'INSERT INTO ws(username) VALUES(?)';
//            echo $query . "<br>";
//            $stmt = $connection->prepare($query);
//            if (!$stmt) {
//                throw new Exception('Failed to prepare statement: ' . $connection->error);
//            }
//
//            $stmt->bind_param("s", $username);
//            $stmt->execute();
//            if ($stmt->error) {
//                throw new Exception('Failed to execute statement: ' . $stmt->error);
//            }
//
//            $stmt->close();
//            $connection->close();
//        } catch (Exception $e) {
//            die("Query failed: " . $e->getMessage());
//        }
//    } else {
//        echo "Input login not set<br>";
//    }
//} else {
//    header("Location: ../src/index.php");
//    exit; // Ensure script stops after redirection
//}

