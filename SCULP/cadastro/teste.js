const form = document.getElementById('form');

// Função para validar o campo de usuário
function validateUsername(username) {
  // Verifica se o campo está vazio
  if (username === '') {
    return 'O campo de usuário é obrigatório.';
  }

  // Verifica se o campo contém pelo menos 6 caracteres
  if (username.length < 6) {
    return 'O campo de usuário deve ter pelo menos 6 caracteres.';
  }

  // Verifica se o campo contém apenas caracteres alfanuméricos
  if (!/^[a-z0-9]+$/i.test(username)) {
    return 'O campo de usuário deve conter apenas caracteres alfanuméricos.';
  }

  // O campo de usuário é válido
  return null;
}

// Função para validar o campo de e-mail
function validateEmail(email) {
  // Verifica se o campo está vazio
  if (email === '') {
    return 'O campo de e-mail é obrigatório.';
  }

  // Verifica se o campo contém um endereço de e-mail válido
  if (!/^[a-zA-Z0-9.!#%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return 'O endereço de e-mail é inválido.';
  }

  // O campo de e-mail é válido
  return null;
}

// Função para validar o campo de senha
function validatePassword(password) {
  // Verifica se o campo está vazio
  if (password === '') {
    return 'O campo de senha é obrigatório.';
  }

  // Verifica se o campo contém pelo menos 8 caracteres
  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }

  // Verifica se o campo contém pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }

  // Verifica se o campo contém pelo menos um número
  if (!/[0-9]/.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }

  // O campo de senha é válido
  return null;
}

// Função para validar o campo de confirmação de senha
function validateConfirmPassword(confirmPassword, password) {
  // Verifica se o campo está vazio
  if (confirmPassword === '') {
    return 'O campo de confirmação de senha é obrigatório.';
  }

  // Verifica se o campo é igual ao campo de senha
  if (confirmPassword !== password) {
    return 'A senha de confirmação não é igual à senha.';
  }

  // O campo de confirmação de senha é válido
  return null;
}

// Adiciona um evento de submit ao formulário
form.addEventListener('submit', (event) => {
  // Previne o comportamento padrão do formulário
  event.preventDefault();

  // Valida os campos do formulário
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

  // Exibir mensagens de erro, se houver
  if (usernameError) {
    alert(usernameError);
  }
  if (emailError) {
    alert(emailError);
  }
  if (passwordError) {
    alert(passwordError);
  }
  if (confirmPasswordError) {
    alert(confirmPasswordError);
  }

  // Se todos os campos forem válidos, você pode enviar o formulário aqui
});
const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root1',
  password: '', 
  database: 'tesxt',
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (usernameError || emailError || passwordError) {
    return res.status(400).json({ error: 'Campos inválidos.' });
  }

  
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
    res.status(200).json({ message: 'Usuário registrado com sucesso.' });
  });
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
