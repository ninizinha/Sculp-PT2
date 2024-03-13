const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Substitua pela senha do seu MySQL, se necessário
  database: 'my_database',
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Valida os campos do formulário
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (usernameError || emailError || passwordError) {
    return res.status(400).json({ error: 'Campos inválidos.' });
  }

  // Inserir os dados do usuário no banco de dados
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
    
    // Consultar os dados do usuário no banco de dados
    const selectQuery = 'SELECT * FROM users WHERE id = ?';
    connection.query(selectQuery, [result.insertId], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
      }
      res.status(200).json({ message: 'Usuário registrado com sucesso.', user: user[0] });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});

const form = document.getElementById('form');
const submitButton = document.getElementById('submitButton');
const errorMessages = document.getElementById('errorMessages');

submitButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Valida os campos do formulário
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

  if (usernameError || emailError || passwordError || confirmPasswordError) {
    errorMessages.innerHTML = '<ul>';
    if (usernameError) {
      errorMessages.innerHTML += `<li>${usernameError}</li>`;
    }
    if (emailError) {
      errorMessages.innerHTML += `<li>${emailError}</li>`;
    }
    if (passwordError) {
      errorMessages.innerHTML += `<li>${passwordError}</li>`;
    }
    if (confirmPasswordError) {
      errorMessages.innerHTML += `<li>${confirmPasswordError}</li>`;
    }
    errorMessages.innerHTML += '</ul>';
  } else {
    // Envie os dados do formulário para o servidor
    const data = { username, email, password };
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          errorMessages.innerHTML = `<p>${data.error}</p>`;
        } else {
          errorMessages.innerHTML = `<p>${data.message}</p>`;
          console.log('Usuário registrado:', data.user);
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
});
