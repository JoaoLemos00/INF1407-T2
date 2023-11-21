document.addEventListener('DOMContentLoaded', function () {
    // Extrai o parâmetro pk (ID do post) da URL
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');
    // Busca os detalhes do post pelo ID
    fetch(backendAddress + 'blog/' + slug + '/', {
        method: 'GET',
    })
        .then(function (response) {
            response.json().then(function (blogPost) {

                // Preencher os detalhes do post nos elementos HTML
                document.getElementById("title").value = blogPost.title;
                document.getElementById("body").value = blogPost.body;
                document.getElementById("image").src = blogPost.image;

            }).catch(function (error) {
                console.error("Erro:", error);
            });
        });
});

document.addEventListener("DOMContentLoaded", function () {
    var btnSavePost = document.getElementById("btnSavePost");

    if (btnSavePost) {
        btnSavePost.addEventListener("click", function (event) {
            event.preventDefault();

            // Obtenha os novos valores do post
            var newTitle = document.getElementById("title").value;
            var newBody = document.getElementById("body").value;
            var newImage = document.getElementById("image").files[0];

            // Elemento para exibir mensagens
            const msg = document.getElementById("msg");

            // Obtém o slug do post da URL
            var urlParams = new URLSearchParams(window.location.search);
            var slug = urlParams.get('slug');

            // Obtém o token do localStorage
            var token = localStorage.getItem('token');

            // Construa um objeto FormData para enviar dados do formulário, incluindo a imagem (se fornecida)
            var formData = new FormData();
            formData.append("title", newTitle);
            formData.append("body", newBody);
            if (newImage) {
                formData.append("image", newImage[0]);
            }
        
            // Envia a solicitação de atualização do post
            console.log(backendAddress + "blog/" + slug + "/update")
            fetch(backendAddress + "blog/" + slug + "/update", {
                method: "PUT",
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                
                if(data.response === "POST atualizado com sucesso!") {
                    window.location.replace("index.html");
                }
                if (data.title && data.title.length > 1) {
                    msg.innerHTML = 'Titulo inválido';
                } else if (data.body && data.body.length > 1) {
                    msg.innerHTML = 'Corpo inválido';
                } else {
                    throw new Error("Falha na atualização do post");
                }
            })
            .catch(function (error) {
                console.log(error);
                msg.innerHTML = "Erro durante a atualização do post. Por favor, tente novamente.";
            });
        });
    }
});
