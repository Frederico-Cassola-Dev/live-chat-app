<?php

use MyApp\Chat;

try {
    require_once "../database/dbHandler.php";

    $query = "INSERT";

}catch(Exception $e){
    die("Query failed: " . $e->getMessage());
}
