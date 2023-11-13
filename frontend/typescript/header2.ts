// Este é um exemplo de código TypeScript que define a estrutura da sua página web.

// Importe a folha de estilos do Bootstrap
import 'bootstrap@5.2.1/dist/css/bootstrap.min.css';

// Função para criar elementos HTML e aplicar estilos
function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'p-3 text-bg-dark';

  const container = document.createElement('div');
  container.className = 'container';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';

  const logoImg = document.createElement('img');
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

  const dFlexContainer = document.createElement('div');
  dFlexContainer.className = 'd-flex flex-wrap align-items-center justify-content-start justify-content-lg-start';

  // Adicione lógica condicional aqui para verificar se o usuário está autenticado
  const userAuthenticated = true; // Defina isso de acordo com a autenticação real

  if (userAuthenticated) {
    const welcomeText = document.createElement('a');
    welcomeText.className = 'd-flex align-items-center text-white text-decoration-none';
    welcomeText.textContent = `Bem-Vindo, ${'Nome do Usuário'}! |`;
    dFlexContainer.appendChild(welcomeText);
  }

  const navList = document.createElement('ul');
  navList.className = 'nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0';
  const listItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.className = 'nav-link px-2 text-white';
  navLink.textContent = 'Home';
  listItem.appendChild(navLink);
  navList.appendChild(listItem);
  dFlexContainer.appendChild(navList);

  if (userAuthenticated) {
    // Adicione botões para usuários autenticados
    const logoutButton = document.createElement('a');
    logoutButton.href = '/logout';
    logoutButton.className = 'btn btn-outline-light me-2';
    logoutButton.textContent = 'Logout';
    const accountButton = document.createElement('a');
    accountButton.href = '/account';
    accountButton.className = 'btn btn-warning';
    accountButton.textContent = 'Conta';

    const textEndDiv = document.createElement('div');
    textEndDiv.className = 'text-end';
    textEndDiv.appendChild(logoutButton);
    textEndDiv.appendChild(accountButton);

    dFlexContainer.appendChild(textEndDiv);
  } else {
    // Adicione botões para usuários não autenticados
    const loginButton = document.createElement('a');
    loginButton.href = '/login';
    loginButton.className = 'btn btn-outline-light me-2';
    loginButton.textContent = 'Login';
    const signupButton = document.createElement('a');
    signupButton.href = '/register';
    signupButton.className = 'btn btn-warning';
    signupButton.textContent = 'Sign-up';

    const textEndDiv = document.createElement('div');
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
const header = createHeader();
document.body.appendChild(header);
