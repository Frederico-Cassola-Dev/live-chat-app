<?php

use MyApp\Chat;

try {
    require_once "../database/dbHandler.php";
// TODO - Post the user after login into the db ws table to make a group of users with the websocket

    $query = "INSERT";

}catch(Exception $e){
    die("Query failed: " . $e->getMessage());
}
