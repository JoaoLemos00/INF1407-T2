import { usuarioAuthPromise } from './autentificacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAuthPromise
        .then(({ usuarioAuth }) => {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('slug');

            if (slug && slug.split("-")[0] === usuarioAuth) {
                loadAndEditPost(slug);
            } else {
                window.location.replace("index.html");
            }
        })
        .catch(error => {
            console.error("Error during user authentication:", error);
            // Trate o erro conforme necessário
        });
});

function loadAndEditPost(slug) {
    fetch(backendAddress + 'blog/' + slug + '/', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(blogPost => {
        // Preencher os detalhes do post nos elementos HTML
  
        document.getElementById("title").value = blogPost.title;
        document.getElementById("body").value = blogPost.body;
        document.getElementById("image").src = backendAddress + blogPost.image;
    })
    .catch(error => {
        console.error("Erro ao carregar detalhes do post:", error);
    });

    const btnSavePost = document.getElementById("btnSavePost");

    if (btnSavePost) {
        btnSavePost.addEventListener("click", function (event) {
            event.preventDefault();

            const newTitle = document.getElementById("title").value;
            const newBody = document.getElementById("body").value;
            const newImage = document.getElementById("image").files[0];
            const msg = document.getElementById("msg");
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('slug');
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append("title", newTitle);
            formData.append("body", newBody);
            if (newImage) {
                formData.append("image", newImage);
            }

            fetch(backendAddress + "blog/" + slug + "/update", {
                method: "PUT",
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.response === "POST atualizado com sucesso!") {
                    window.location.replace("index.html");
                } else if (data.title && data.title.length > 1) {
                    msg.innerHTML = 'Titulo inválido';
                } else if (data.body && data.body.length > 1) {
                    msg.innerHTML = 'Corpo inválido';
                } else {
                    throw new Error("Falha na atualização do post");
                }
            })
            .catch(error => {
                console.error(error);
                msg.innerHTML = "Erro durante a atualização do post. Por favor, tente novamente.";
            });
        });
    }
}
