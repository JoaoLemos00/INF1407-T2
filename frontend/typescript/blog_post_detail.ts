document.addEventListener('DOMContentLoaded', function () {
    // Extrai o parâmetro pk (ID do post) da URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pk');

    if (postId) {
        // Busca os detalhes do post pelo ID
        fetch(`${backendAddress}blog/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': tokenKeyword + token // Reenvia o token no cabeçalho HTTP
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (blogPost) {
                // Chama a função para exibir os detalhes do post
                displayBlogPostDetails(blogPost);
            })
            .catch(function (error) {
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
        console.error('Post ID (pk) not found in the URL parameters.');
    }
});

function displayBlogPostDetails(blogPost) {
    // Obtenha as referências aos elementos HTML onde você deseja exibir os detalhes do post
    const titleElement = document.querySelector('.card-header');
    const bodyElement = document.querySelector('.card-body');
    const infoElement = document.querySelector('.card-footer');

    // Preencha os elementos com os detalhes do post
    if (titleElement) {
        titleElement.textContent = blogPost.title;
    }

    if (bodyElement) {
        bodyElement.textContent = blogPost.body;
    }

    if (infoElement) {
        // Exemplo: "Postado por Autor em 01 de janeiro de 2023"
        const datePublished = new Date(blogPost.date_published).toLocaleDateString();
        infoElement.textContent = `Postado por ${blogPost.username} em ${datePublished}`;
    }
}
