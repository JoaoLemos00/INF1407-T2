onload = function () {
    createHeader(); // exibe lista de carros ao carregar a página
};
// Este é um exemplo de código TypeScript que define a estrutura da sua página web.

// Importe a folha de estilos do Bootstrap

// Função para criar elementos HTML e aplicar estilos
function createHeader() {
    var header = document.createElement('header');
    header.className = 'p-3 text-bg-dark';
    var container = document.createElement('div');
    container.className = 'container';
    var logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    var logoImg = document.createElement('img');
    logoImg.className = 'img-fluid logo-img';
    logoImg.src = '/images/Logo-site-Blog-com-receitas3SF-removebg-preview.png';
    logoImg.alt = 'Blog de Receitas';
    // Estilos em TypeScript (ou você pode adicionar esses estilos a uma folha de estilos separada)
    logoImg.style.width = '100px';
    logoImg.style.height = 'auto';
    logoContainer.style.position = 'absolute';
    logoContainer.style.top = '15px';
    logoContainer.style.left = '10px';
    logoContainer.appendChild(logoImg);
    container.appendChild(logoContainer);
    var dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'd-flex flex-wrap align-items-center justify-content-start justify-content-lg-start';
    // Adicione lógica condicional aqui para verificar se o usuário está autenticado
    var userAuthenticated = true; // Defina isso de acordo com a autenticação real
    if (userAuthenticated) {
        var welcomeText = document.createElement('a');
        welcomeText.className = 'd-flex align-items-center text-white text-decoration-none';
        welcomeText.textContent = "Bem-Vindo, ".concat('Nome do Usuário', "! |");
        dFlexContainer.appendChild(welcomeText);
    }
    var navList = document.createElement('ul');
    navList.className = 'nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0';
    var listItem = document.createElement('li');
    var navLink = document.createElement('a');
    navLink.className = 'nav-link px-2 text-white';
    navLink.textContent = 'Home';
    listItem.appendChild(navLink);
    navList.appendChild(listItem);
    dFlexContainer.appendChild(navList);
    if (userAuthenticated) {
        // Adicione botões para usuários autenticados
        var logoutButton = document.createElement('a');
        logoutButton.href = '/logout';
        logoutButton.className = 'btn btn-outline-light me-2';
        logoutButton.textContent = 'Logout';
        var accountButton = document.createElement('a');
        accountButton.href = '/account';
        accountButton.className = 'btn btn-warning';
        accountButton.textContent = 'Conta';
        var textEndDiv = document.createElement('div');
        textEndDiv.className = 'text-end';
        textEndDiv.appendChild(logoutButton);
        textEndDiv.appendChild(accountButton);
        dFlexContainer.appendChild(textEndDiv);
    }
    else {
        // Adicione botões para usuários não autenticados
        var loginButton = document.createElement('a');
        loginButton.href = '/frontend/public/login.html';
        loginButton.className = 'btn btn-outline-light me-2';
        loginButton.textContent = 'Login';
        var signupButton = document.createElement('a');
        signupButton.href = '/register';
        signupButton.className = 'btn btn-warning';
        signupButton.textContent = 'Sign-up';
        var textEndDiv = document.createElement('div');
        textEndDiv.className = 'text-end';
        textEndDiv.appendChild(loginButton);
        textEndDiv.appendChild(signupButton);
        dFlexContainer.appendChild(textEndDiv);
    }
    container.appendChild(dFlexContainer);
    header.appendChild(container);
    // Adicione lógica para incluir o snippet de popup, se necessário
    // const popupSnippet = document.createElement('div');
    // Adicione conteúdo do snippet de popup aqui
    // header.appendChild(popupSnippet);
    return header;
}
// Crie o cabeçalho e adicione-o ao corpo do documento
var header = createHeader();
document.body.appendChild(header);
