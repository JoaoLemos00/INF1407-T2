import { usuarioAuthPromise } from './autentificacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAuthPromise
        .then(({ usuarioAuth, response }) => {
            if (response.ok) {
                create_post();
            } else {
                window.location.replace("index.html");
            }
        })
        .catch(error => {
            console.error("Error during user authentication:", error);
            // Trate o erro conforme necessário
        });
});

function create_post() {
    const btnPost = document.getElementById("btnPost");

    if (btnPost) {
        btnPost.addEventListener("click", function (event) {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const body = document.getElementById("body").value;
            const imageInput = document.getElementById("image");
            const msg = document.getElementById("msg");
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);

            // Verifica se um arquivo de imagem foi fornecido
            if (imageInput.files.length > 0) {
                formData.append('image', imageInput.files[0]);
            }

            fetch(backendAddress + "blog/create", {
                method: "POST",
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.response === "Post Criado com Sucesso!") {
                    window.location.replace("index.html");
                } else {
                    throw new Error("Falha na criação do post");
                }
            })
            .catch(error => {
                console.error(error);
                msg.innerHTML = "Erro durante a criação do post. Por favor, tente novamente.";
            });
        });
    }
}
