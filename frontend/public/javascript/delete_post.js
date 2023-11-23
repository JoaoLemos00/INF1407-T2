import {usuarioAuthPromise} from './autentificacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAuthPromise.then(usuarioAuth => {
        user_autenticado(usuarioAuth.usuarioAuth);
    });
});

function user_autenticado(usuarioAuth){
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');
    const parteAntesDoHifen = slug.split("-")[0];
    if (parteAntesDoHifen === usuarioAuth) {
        delete_post(slug);
    }else {
        window.location.replace("index.html");
    }
}

function delete_post(slug){
    
    document.getElementById("deleteButton").addEventListener("click", function (evento) {
        evento.preventDefault();
        var token = localStorage.getItem("token");
        fetch(backendAddress + 'blog/' + slug + '/delete' , {
            method: "DELETE",
            headers: {
                'Authorization': tokenKeyword + token 
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success === "Post excluído com sucesso!") {
                window.location.replace("index.html");
            }
        })
    }
    )
}