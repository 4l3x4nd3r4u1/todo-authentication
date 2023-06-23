CREATE DATABASE todo;

CREATE TABLE todos(
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255), 
  title VARCHAR(30), 
  date VARCHAR(300)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY, 
  hashed_password VARCHAR(255)
);

INSERT INTO todos(id, user_email, title, date) 
VALUES (
  '0', 
  'alex@test.com',
  'Create a todo-list application', 
  'Tue Jun 13 2023 10:20:33 GMT+0400 (Mauritius Standard Time)'
);
