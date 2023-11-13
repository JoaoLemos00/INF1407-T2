// Lógica TypeScript para verificar se o usuário está autenticado

const userSection = document.getElementById('userSection');
const welcomeText = document.getElementById('welcomeText');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const logoutButton = document.getElementById('logoutButton');
const accountButton = document.getElementById('accountButton');

// Simulando um usuário autenticado (ajuste conforme necessário)
const userAuthenticated = true;
const userName = 'Nome do Usuário';

if (userAuthenticated) {
    // Usuário autenticado
    welcomeText.textContent = `Bem-Vindo, ${userName}! |`;
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    accountButton.style.display = 'inline-block';
} else {
    // Usuário não autenticado
    welcomeText.textContent = 'Olá, visitante';
    logoutButton.style.display = 'none';
    accountButton.style.display = 'none';
    loginButton.style.display = 'inline-block';
    signupButton.style.display = 'inline-block';
}