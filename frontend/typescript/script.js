onload = function () {
    exibeListaDeCarros(); // exibe lista de carros ao carregar a página
  };

function exibeListaDeCarros() {
    fetch("http://127.0.0.1:8000/blog/list")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data); // Verifique o formato da resposta
            if (data && data.results && Array.isArray(data.results)) {
                var postagens = data.results;
                var postList = document.getElementById("postList");
                postList.innerHTML = '';  // Limpa o conteúdo anterior
                postagens.forEach(function (postagem) {
                    var postDiv = document.createElement('div');
                    postDiv.innerHTML = `
                        <h2>${postagem.title}</h2>
                        <p>${postagem.body}</p>
                    `;
                    postList.appendChild(postDiv);
                });
            } else {
                console.error("Erro: Formato de resposta inválido");
            }
        })
        .catch(function (error) {
            console.error("Erro:", error);
        });
}
