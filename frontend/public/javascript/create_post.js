document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnPost").addEventListener("click", function (event) {
        event.preventDefault();
        var title = document.getElementById("title").value;
        var body = document.getElementById("body").value;
        var imageInput = document.getElementById("image");
        var msg = document.getElementById("msg");

        var token = localStorage.getItem('token');
        
        var formData = new FormData();
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
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.response == "Post Criado com Sucesso!") {
                window.location.replace("index.html");
            }
            else {
                throw new Error("Falha na atualização");
            }
        })
        .catch(function (error) {
            console.log(error);
            msg.innerHTML = "Error during registration. Please try again.";
        });
    });
});
