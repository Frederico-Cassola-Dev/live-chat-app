DROP TABLE IF EXISTS ws;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(100) NOT NULL,
    status          tinyint default 0,
    last_connection datetime
);

create table if not exists conversations
(
    id            int auto_increment primary key,
    sender_id     int,
    receiver_id   int,
    creation_date datetime
);

create table if not exists messages
(
    id              int auto_increment primary key,
    msg            varchar(255),
    creation_date   datetime,
    user_id         int not null,
    conversation_id int not null,
    foreign key (user_id) references users (id),
    foreign key (conversation_id) references conversations (id)
);

