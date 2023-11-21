let usuarioAuth: string | undefined;
let usuarioAuthPromise = new Promise<string>((resolve, reject) => {
  window.addEventListener('load', function () {
    const token = localStorage.getItem('token');
    const backendAddress = 'Sua URL de backend aqui'; // Substitua pelo endereço real do seu backend

    fetch(backendAddress + 'account/login', {
      method: 'GET',
      headers: {
        'Authorization': tokenKeyword + token, // Assume que você usa o tipo de autenticação 'Bearer'
      }
    })
    .then(response => response.json())
    .then(data => {
      usuarioAuth = data.username;
      resolve(usuarioAuth);
    })
    .catch(erro => {
      console.log('[setLoggedUser] deu erro: ' + erro);
      reject(erro);
    });
  });
});

export { usuarioAuthPromise };
