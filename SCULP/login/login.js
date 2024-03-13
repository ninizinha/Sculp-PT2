// Ao clicar no Submit
document.getElementById('submitBtn').addEventListener('click', function() {
    // Verificar se o usuário inseriu informações na aba de login
    const loginInput = document.getElementById('loginInput').value;
    if (!loginInput) {
        alert('Por favor, insira suas informações de login.');
        return;
    }

    // Verificar se as informações de login estão registradas no banco de dados
    const loginInfoValid = verificarLoginNoBancoDeDados(loginInput);
    if (!loginInfoValid) {
        alert('Informações de login inválidas. Por favor, verifique seus dados.');
        return;
    }

    // Verificar se o usuário inseriu informações na aba de password
    const passwordInput = document.getElementById('passwordInput').value;
    if (!passwordInput) {
        alert('Por favor, insira suas informações de senha.');
        return;
    }

    // Verificar se as informações de senha estão registradas no banco de dados
    const passwordInfoValid = verificarSenhaNoBancoDeDados(passwordInput);
    if (!passwordInfoValid) {
        alert('Senha incorreta. Por favor, verifique sua senha.');
        return;
    }

    // Se autorizado, redirecionar o usuário para a página principal
    redirecionarParaPaginaPrincipal();
});

function verificarLoginNoBancoDeDados(loginInput) {
    const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = mongoose.model('User', {
    username: String,
    password: String,
});

// Função para verificar o login no banco de dados
async function verificarLoginNoBancoDeDados(username, password) {
    try {
        // Consulte o banco de dados para encontrar um usuário com o nome de usuário fornecido
        const user = await User.findOne({ username });

        // Se o usuário não for encontrado, retorne false
        if (!user) {
            return false;
        }

        // Verifique se a senha fornecida corresponde à senha no banco de dados usando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Se as senhas coincidirem, retorne true; caso contrário, retorne false
        return passwordMatch;
    } catch (error) {
        console.error('Erro ao verificar login no banco de dados:', error);
        return false;
    }
}

}

function verificarSenhaNoBancoDeDados(passwordInput) {
    const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defina um modelo de usuário no Mongoose (usando o MongoDB)
const User = mongoose.model('User', {
    username: String,
    password: String,
});

// Função para verificar a senha no banco de dados
async function verificarSenhaNoBancoDeDados(username, password) {
    try {
        // Consulte o banco de dados para encontrar um usuário com o nome de usuário fornecido
        const user = await User.findOne({ username });

        // Se o usuário não for encontrado, retorne false
        if (!user) {
            return false;
        }

        // Verifique se a senha fornecida corresponde à senha no banco de dados usando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Se as senhas coincidirem, retorne true; caso contrário, retorne false
        return passwordMatch;
    } catch (error) {
        console.error('Erro ao verificar senha no banco de dados:', error);
        return false;
    }
}

}

function redirecionarParaPaginaPrincipal() {
// Defina o URL da página principal
const paginaPrincipalURL = '/pagina-principal'; // Substitua pelo URL da sua página principal

// Redirecione o usuário para a página principal
window.location.href = paginaPrincipalURL;
}
