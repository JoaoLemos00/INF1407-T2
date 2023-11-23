import { usuarioAuthPromise } from './autentificacao.js';

usuarioAuthPromise.then(({ usuarioAuth, response }) => {
    exibirLogadoOuNao(response,usuarioAuth);
});


function exibirLogadoOuNao(response,usuario) {

        if (response.ok) {
            console.log('Usuário autenticado:', usuario);
            // token enviado no cabeçalho foi aceito pelo servidor
            var objDiv = document.getElementById('logged');
            objDiv.classList.remove('invisivel');  
            objDiv.classList.add('visivel');  
            objDiv = document.getElementById('unlogged');
            objDiv.classList.remove('visivel');  
            objDiv.classList.add('invisivel');  
        }
        else {
            console.log('Usuário não autenticado. Usando nome de usuário padrão.');
    
            // token enviado no cabeçalho foi rejeitado pelo servidor
            usuario = ' Visitante';
            var objDiv = document.getElementById('unlogged');
            objDiv.classList.remove('invisivel');  
            objDiv.classList.add('visivel');  
            objDiv = document.getElementById('logged');
            objDiv.classList.remove('visivel');  
            objDiv.classList.add('invisivel');  
        }
    
        var spanElement = document.getElementById('identificacao');
        spanElement.innerHTML = usuario;
    

}