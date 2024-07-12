DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ws;

CREATE TABLE IF NOT EXISTS users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    age        INT          NOT NULL,
    country    VARCHAR(100) NOT NULL,
    email      VARCHAR(254) NOT NULL
);

INSERT INTO users (username, first_name, last_name, age, country, email)
VALUES ('john_doe', 'John', 'Doe', 34, 'France', 'john_doe@mail.com'),
       ('jane_smith', 'Jane', 'Smith', 28, 'USA', 'jane_smith@mail.com'),
       ('alex_johnson', 'Alex', 'Johnson', 40, 'Canada', 'alex_johnson@mail.com'),
       ('emma_wilson', 'Emma', 'Wilson', 25, 'Australia', 'emma_wilson@mail.com'),
       ('michael_brown', 'Michael', 'Brown', 32, 'UK', 'michael_brow@mail.com'),
       ('sara_garcia', 'Sara', 'Garcia', 29, 'Spain', 'john_doe@mail.com'),
       ('peter_miller', 'Peter', 'Miller', 38, 'Germany', 'john_doe@mail.com'),
       ('laura_gonzalez', 'Laura', 'Gonzalez', 31, 'Mexico', 'john_doe@mail.com'),
       ('david_kim', 'David', 'Kim', 36, 'South Korea', 'john_doe@mail.com'),
       ('sophia_lambert', 'Sophia', 'Lambert', 27, 'Italy', 'john_doe@mail.com');

CREATE TABLE IF NOT EXISTS ws
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    session  VARCHAR(100)
);

INSERT INTO ws (username, session)
VALUES ('user_1', 'session_1'),
       ('user_2', 'session_1'),
       ('user_3', 'session_1'),
       ('user_4', 'session_2'),
       ('user_5', 'session_2'),
       ('user_6', 'session_3'),
       ('user_7', 'session_3');
