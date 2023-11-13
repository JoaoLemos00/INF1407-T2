onload = function () {
    exibeListaDePost(); // exibe lista de carros ao carregar a página
};
function createBlogPostElement(blogPost) {
    var postDiv = document.createElement('div');
    postDiv.className = 'card m-auto text-bg-dark';
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';
    var postText = document.createElement('p');
    postText.className = 'card-text';
    postText.textContent = "Postado por ".concat(blogPost.author, ", em ").concat(blogPost.date_published);
    var title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = blogPost.title;
    var body = document.createElement('pre');
    body.className = 'card-text text-bg-dark';
    body.textContent = blogPost.body;
    cardBody.appendChild(postText);
    cardBody.appendChild(title);
    cardBody.appendChild(body);
    if (blogPost.image) {
        var image = document.createElement('img');
        image.className = 'card-img-top';
        image.src = blogPost.image;
        image.alt = '';
        cardBody.appendChild(image);
    }
    var cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-muted';
    if (blogPost.date_updated && blogPost.date_updated !== blogPost.date_published) {
        cardFooter.textContent = "Atualizado em ".concat(blogPost.date_updated);
    }
    else {
        cardFooter.textContent = 'Post original';
    }
    postDiv.appendChild(cardBody);
    postDiv.appendChild(cardFooter);
    return postDiv;
}

function exibeListaDePost() {
    fetch("http://127.0.0.1:8000/blog/list")
        .then(function (response) { return response.json(); })
        .then(function (blog_Posts) {
        var postList = document.getElementById("postList");
        postList.innerHTML = ''; // Limpa o conteúdo anterior
        blog_Posts.results.forEach(function (blogPost) {
            var postElement = createBlogPostElement(blogPost);
            postList.appendChild(postElement);
        });
        
    })
        .catch(function (error) {
        console.error("Erro:", error);
    });
}
