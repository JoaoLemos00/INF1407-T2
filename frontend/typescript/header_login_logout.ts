window.addEventListener('load', function () {
    // Verifica o username e coloca no cabeçalho da página
    var token = localStorage.getItem('token'); // Recupera o token de autenticação
  
    fetch(backendAddress + 'account/login', {
      method: 'GET',
      headers: {
        'Authorization': tokenKeyword + token // Reenvia o token no cabeçalho HTTP
      }
    })
      .then(function (response) {
        response.json().then(function (data) {
          var usuario = data;
          exibirLogadoOuNao(response, usuario);
        });
      })
      .catch(function (erro) {
        console.log('[setLoggedUser] deu erro: ' + erro);
      });
  });
  
  function exibirLogadoOuNao(response: Response, usuario: any) {
    if (response.ok) {
      console.log('Usuário autenticado:', usuario.username);
  
      // token enviado no cabeçalho foi aceito pelo servidor
      var objDiv = document.getElementById('logged');
      objDiv.classList.remove('invisivel');
      objDiv.classList.add('visivel');
      objDiv = document.getElementById('unlogged');
      objDiv.classList.remove('visivel');
      objDiv.classList.add('invisivel');
    } else {
      console.log('Usuário não autenticado. Usando nome de usuário padrão.');
  
      // token enviado no cabeçalho foi rejeitado pelo servidor
      usuario.username = ' Visitante';
      var objDiv = document.getElementById('unlogged');
      objDiv.classList.remove('invisivel');
      objDiv.classList.add('visivel');
      objDiv = document.getElementById('logged');
      objDiv.classList.remove('visivel');
      objDiv.classList.add('invisivel');
    }
  
    var spanElement = document.getElementById('identificacao');
    if (spanElement) {
      spanElement.innerHTML = usuario.username;
    }
  }
  