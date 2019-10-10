create database db_node; -- Create the new database
create user 'user'@'localhost' identified by 'password'; -- Creates the user
grant all on db_springmvc.* to 'user'@'localhost'; -- Gives all the privileges to the new user on the newly created database

-- Create the tables that will hold the users
CREATE TABLE `db_node`.`users`
(
  `username`  VARCHAR(45) NOT NULL,
  `password`  VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`)
);

-- Create the tables that will hold the relationship between users following each other
-- Add constrains so we can only follow users that exists
CREATE TABLE `db_node`.`following`
(
  `username`  VARCHAR(45) NOT NULL,
  `followingusername`  VARCHAR(45) NOT NULL,
  CONSTRAINT FK_username FOREIGN KEY (username)
  REFERENCES users(username),
  CONSTRAINT FK_followingusername FOREIGN KEY (followingusername)
  REFERENCES users(username)
);

-- Create a table that holds the messages a user creates
CREATE TABLE `db_node`.`messages`
(
  `username`  VARCHAR(45) NOT NULL,
  `message`  VARCHAR(160) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  CONSTRAINT FK_messagesusername FOREIGN KEY (username)
  REFERENCES users(username)
);