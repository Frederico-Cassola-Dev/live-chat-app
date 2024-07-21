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
#     first_name VARCHAR(100) NOT NULL,
#     last_name  VARCHAR(100) NOT NULL,
#     age        INT          NOT NULL,
#     country    VARCHAR(100) NOT NULL,
#     email      VARCHAR(254) NOT NULL
);

# INSERT INTO users (username, first_name, last_name, age, country, email)
# VALUES ('john_doe', 'John', 'Doe', 34, 'France', 'john_doe@mail.com'),
#        ('jane_smith', 'Jane', 'Smith', 28, 'USA', 'jane_smith@mail.com'),
#        ('alex_johnson', 'Alex', 'Johnson', 40, 'Canada', 'alex_johnson@mail.com'),
#        ('emma_wilson', 'Emma', 'Wilson', 25, 'Australia', 'emma_wilson@mail.com'),
#        ('michael_brown', 'Michael', 'Brown', 32, 'UK', 'michael_brow@mail.com'),
#        ('sara_garcia', 'Sara', 'Garcia', 29, 'Spain', 'john_doe@mail.com'),
#        ('peter_miller', 'Peter', 'Miller', 38, 'Germany', 'john_doe@mail.com'),
#        ('laura_gonzalez', 'Laura', 'Gonzalez', 31, 'Mexico', 'john_doe@mail.com'),
#        ('david_kim', 'David', 'Kim', 36, 'South Korea', 'john_doe@mail.com'),
#        ('sophia_lambert', 'Sophia', 'Lambert', 27, 'Italy', 'john_doe@mail.com');
#
# CREATE TABLE IF NOT EXISTS ws
# (
#     id                INT AUTO_INCREMENT PRIMARY KEY,
#     username          VARCHAR(100),
#     message           VARCHAR(254),
#     connection_number INT,
#     session           INT
# );

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

