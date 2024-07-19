<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $output = shell_exec('php bin/chat-server.php');
    echo json_encode(['status' => 'WebSocket server started']);
} else {
    echo json_encode(['status' => 'WebSocket server not started']);
}