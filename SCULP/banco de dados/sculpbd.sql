CREATE DATABASE IF NOT EXISTS SCULP;
USE SCULP;

-- Tabela para armazenar os dados do usuário
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
