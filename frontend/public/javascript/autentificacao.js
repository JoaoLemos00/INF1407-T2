let usuarioAuth;
let usuarioAuthPromise = new Promise((resolve, reject) => {
    window.addEventListener('load', function () {
        var token = localStorage.getItem('token');
        fetch(backendAddress + 'account/login', {
            method: 'GET',
            headers: {
                'Authorization': tokenKeyword + token
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
