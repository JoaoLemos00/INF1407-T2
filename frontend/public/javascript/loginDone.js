function exibeListaDePost() {
    fetch("http://127.0.0.1:8000/account/list")
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