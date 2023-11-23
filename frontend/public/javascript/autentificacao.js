let usuarioAuth;
let usuarioAuthPromise = new Promise((resolve, reject) => {
    fetch(backendAddress + 'account/login', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + localStorage.getItem('token')
        }
    })
    .then(function (response) {
        response.json().then(function (data) {
            usuarioAuth = data.username;
            resolve({ usuarioAuth, response });
        });
    })
    .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
        reject(erro);
    });
});

export { usuarioAuthPromise };
