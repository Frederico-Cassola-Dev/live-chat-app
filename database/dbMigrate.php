<?php

require __DIR__ . '/../vendor/autoload.php';

// TODO - Use dotenv allover in the project
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$host = $_SERVER['DB_HOST'];
$user = $_SERVER['DB_USER'];
$password = $_SERVER['DB_PASSWORD'];
$dbName = $_SERVER['DB_NAME'];

// TODO - Search the problem with the class mysqli
$connection = new mysqli($host, $user, $password, $dbName);


if($connection->connect_error){
    die("Connection failed: " . $connection->connect_error);
}

$connection->select_db($dbName);

$sqlFile = file_get_contents(__DIR__ . "/db_setup.sql");

if($connection->multi_query($sqlFile) === TRUE){
    echo "Database setup completed successfully";

}else{
    echo "Error setting up database: " . $connection->error;
}