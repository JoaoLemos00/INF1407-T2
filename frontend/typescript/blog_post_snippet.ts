onload = function () {
  exibeListaDePost(); // exibe lista de carros ao carregar a página
};

interface BlogPost {
    author: string;
    date_published: string;
    title: string;
    body: string;
    image?: string;
    date_updated?: string;
}

function createBlogPostElement(blogPost: BlogPost): HTMLDivElement {
    const postDiv = document.createElement('div');
    postDiv.className = 'card m-auto text-bg-dark';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';

    const postText = document.createElement('p');
    postText.className = 'card-text';
    postText.textContent = `Postado por ${blogPost.author}, em ${blogPost.date_published}`;
    
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = blogPost.title;

    const body = document.createElement('pre');
    body.className = 'card-text text-bg-dark';
    body.textContent = blogPost.body;

    cardBody.appendChild(postText);
    cardBody.appendChild(title);
    cardBody.appendChild(body);

    if (blogPost.image) {
        const image = document.createElement('img');
        image.className = 'card-img-top';
        image.src = blogPost.image;
        image.alt = '';
        cardBody.appendChild(image);
    }

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-muted';

    if (blogPost.date_updated && blogPost.date_updated !== blogPost.date_published) {
        cardFooter.textContent = `Atualizado em ${blogPost.date_updated}`;
    } else {
        cardFooter.textContent = 'Post original';
    }

    postDiv.appendChild(cardBody);
    postDiv.appendChild(cardFooter);

    return postDiv;
}

function exibeListaDePost() {
  fetch("http://127.0.0.1:8000/blog/list")
  .then(response => response.json())
  .then(function (blog_Posts) {
    const postList = document.getElementById("postList") as HTMLDivElement;
    postList.innerHTML = '';  // Limpa o conteúdo anterior
    blog_Posts.results.forEach(function (blogPost: any) {
        const postElement = createBlogPostElement(blogPost);
        postList.appendChild(postElement);
    });
})
.catch(function (error) {
    console.error("Erro:", error);
});
    
}
