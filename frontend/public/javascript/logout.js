window.addEventListener('load', function (evento) {
    var token = localStorage.getItem('token');
    fetch(backendAddress + 'account/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': tokenKeyword + token,
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            var mensagem = document.getElementById('mensagem');
            console.log(response);
            if (response.ok) {
                window.location.assign('index.html');
                mensagem.innerHTML = 'Logout efetuado com sucesso!';
            } else {
                mensagem.innerHTML = 'Erro ' + response.status;
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
});
