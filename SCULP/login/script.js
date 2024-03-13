let btn = document.querySelector('.fa-eye-slash')
let inputSenha = document.querySelector('#senha')

btn.addEventListener('click', () => {  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
    btn.setAttribute('class', 'far fa-eye')
  } else{
    inputSenha.setAttribute('type', 'password')
    btn.setAttribute('class', 'far fa-eye-slash')
  }
})

// Seleciona os elementos do DOM
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit-button');

// Adiciona um ouvinte de evento para o botão de envio
submitButton.addEventListener('click', function (e) {
  e.preventDefault(); // Evita que o formulário seja enviado imediatamente

  // Validação simples dos campos de entrada
  if (usernameInput.value.trim() === '') {
    alert('Por favor, preencha o campo de usuário.');
    return;
  }

  if (passwordInput.value.trim() === '') {
    alert('Por favor, preencha o campo de senha.');
    return;
  }

  // Se os campos estiverem preenchidos, você pode prosseguir com o envio do formulário aqui.
  // Normalmente, você enviaria os dados do formulário para o servidor aqui.

  // Exemplo de envio de dados do formulário (neste caso, apenas um alerta)
  alert('Formulário enviado com sucesso!');
  form.reset(); // Limpa os campos do formulário após o envio bem-sucedido
});