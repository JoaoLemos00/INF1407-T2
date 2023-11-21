import {usuarioAuthPromise} from './autentificacao.js';

document.addEventListener('DOMContentLoaded', function () {
    exibeDetailPost();
});

document.addEventListener('DOMContentLoaded', function () {
    usuarioAuthPromise.then(usuarioAuth => {
        exibeDetailPost(usuarioAuth);
    });
});

function exibeDetailPost(usuarioAuth) {
    // Extrai o parâmetro pk (ID do post) da URL
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');
    // Busca os detalhes do post pelo ID
    fetch(backendAddress + 'blog/' + slug + '/', {
        method: 'GET',
    })
        .then(function (response) {
            response.json().then(function (blogPost) {
                var post = document.getElementById("post");
                post.innerHTML = '';
                var postElement = displayBlogPostDetails(blogPost,usuarioAuth);
                post.appendChild(postElement);

            }).catch(function (error) {
                console.error("Erro:", error);
            });
        });
};



function displayBlogPostDetails(blogPost,usuarioAuth) {

    const dateStringUpdated = blogPost.date_updated;
    const date = new Date(dateStringUpdated);
    const date_updated = date.toLocaleString();

    const dateStringPublished = blogPost.date_updated;
    const date2 = new Date(dateStringPublished);
    const date_published = date2.toLocaleString();

    var div1 = document.createElement('div');
    div1.className = 'card m-auto mt-4 text-bg-dark';
    div1.style.width = '900px';

    var div2 = document.createElement('div');
    div2.className = 'card-body my-2';
    div1.appendChild(div2);

    var headerPost = document.createElement('p');
    headerPost.className = 'card-text';
    headerPost.innerHTML = 'Postado por ' + blogPost.username + ', em '+ date_published;
    div2.appendChild(headerPost);

    var div3 = document.createElement('div');
    div3.className = 'd-flex justify-content-between align-items-center'
    div2.appendChild(div3);

    var titlePost = document.createElement('h2');
    titlePost.className = 'card-title';
    titlePost.innerHTML = blogPost.title;
    div3.appendChild(titlePost);

    var hr = document.createElement('hr');
    div2.appendChild(hr);

    var div4 = document.createElement('div');
    div4.className = 'd-flex justify-content-end mx-2';
    div3.appendChild(div4);

    if (blogPost.username == usuarioAuth) {
        var linkEdit = document.createElement('a');
        linkEdit.className = 'btn btn-warning mx-2';
        linkEdit.href = 'edit_post.html?slug=' + blogPost.slug;
        linkEdit.innerHTML = '<i class="bi bi-pencil"></i> Editar';
        div4.appendChild(linkEdit);
        
        // Botão de Exclusão
        var linkDelete = document.createElement('a');
        linkDelete.className = 'btn btn-danger';
        linkDelete.href = 'delete_post.html?slug=' + blogPost.slug;
        linkDelete.innerHTML = '<i class="bi bi-trash"></i> Excluir';
        div4.appendChild(linkDelete);
    }
   
    var div4 = document.createElement('div');
    div4.className = 'container';
    div2.appendChild(div4);

    var bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text';
    bodyPost.innerHTML = blogPost.body;

    div4.appendChild(bodyPost);
    div2.appendChild(hr);

    if (blogPost.image !== null) {
        var imagePost = document.createElement('img');
        imagePost.src = backendAddress + blogPost.image;
        div2.appendChild(imagePost);
    }

    if (date_updated!== date_published) {
        var div5 = document.createElement('div');
        div5.className = 'card-footer text-muted';
        div5.innerHTML = 'Atualizado em '+ date_updated;
    } else {
        var div5 = document.createElement('div');
        div5.className = 'card-footer text-muted';
        div5.innerHTML = 'Post Original';
    }
    div2.appendChild(div5);

    return div1;

}




