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
                console.log(blogPost)
                div1 = document.createElement('div');
                div1.innerHTML = 'AAAAAAAAAAAAAAAAAAAAAAA'
                var postList = document.getElementById("post");
                postList.innerHTML = '';
                // Use the parameter blogPost here
                //displayBlogPostDetails(blogPost);
            }).catch(function (error) {
                console.error("Erro:", error);
            });
        });
});


function displayBlogPostDetails(blogPost) {

    const dateStringUpdated = blogPost.date_updated;
    const date = new Date(dateStringUpdated);
    const date_updated = date.toLocaleString();

    const dateStringPublished = blogPost.date_updated;
    const date2 = new Date(dateStringPublished);
    const date_published = date2.toLocaleString();

    div1 = document.createElement('div');
    div1.className = "card-body my-2";

    var headerPost = document.createElement('p');
    headerPost.className = 'card-text'
    headerPost.textContent = "Postado por " + blogPost.username + ", em " + date_published;
    div1.appendChild(headerPost);

    var div2 = document.createElement('div');
    div2.className = 'd-flex justify-content-between align-items-center'
    var titlePost = document.createElement('h2');
    titlePost.className = 'card-title'
    titlePost.textContent = blogPost.title;
    div2.appendChild(titlePost);
    div2.appendChild(div1);

    var div3 = document.createElement('div');
    div3.className = 'd-flex justify-content-end mx-2'

    //{% if blog_post.author == request.user %}
    var linkEdit = document.createElement('a');
    linkEdit.className = 'btn btn-warning mx-2';
    linkEdit.href = 'blog_post_edit.html?pk=' + blogPost.id;

    var linkDelete = document.createElement('a');
    linkDelete.className = 'btn btn-danger';
    linkDelete.href = 'blog_post_delete.html?pk=' + blogPost.id;

    div3.appendChild(linkEdit);
    div3.appendChild(linkDelete);

    div2.appendChild(div3);
    //{% endif %}

    var hr = document.createElement('hr')
    hr.appendChild(div1);

    div4 = document.createElement('div');
    div4.className = 'container';

    var bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text';
    bodyPost.textContent = blogPost.body;
    div4.appendChild(bodyPost);
    div1.appendChild(div4);

    hr.appendChild(div1);
    //{% if blog_post.image %}
    var imagePost = document.createElement('img');
    imagePost.className = 'card-img-top';
    imagePost.alt = '';
    imagePost.src = blogPost.image;
    div1.appendChild(imagePost);
    //{% endif %}
    div5 = document.createElement('div');
    div5.className = 'card-footer text-muted';
    div5.textContent = "Atualizado em " + date_updated + "por" + blogPost.username;

}



