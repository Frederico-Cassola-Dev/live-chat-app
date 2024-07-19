<?php

namespace MyApp;

use Exception;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use SplObjectStorage;

class Chat implements MessageComponentInterface
{
    protected SplObjectStorage $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ($conn->resourceId)" . "\n";

        // Send a welcome message to the client
        $welcomeMessage = json_encode([
            'type' => 'welcome',
            'message' => 'Welcome! Your resource ID is ' . $conn->resourceId,
            'resourceId' => $conn->resourceId,
        ]);
        $conn->send($welcomeMessage);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {

        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' .
            "\n", $from->resourceId, $msg, $numRecv, $numRecv);



        foreach ($this->clients as $client) {
            $messageToClient = json_encode([
                "type" => "message",
                //            "belong_resourceId" => $conn->resorceId,
                "from_resourceId" => $from->resourceId,
                "data" => json_decode($msg),
                "clientId" => $client,

            ]);

            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                // TODO - Add data from database to send to the client
                $client->send($messageToClient);
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

}

