document.addEventListener('DOMContentLoaded', function () {
    fetch(backendAddress + 'blog/list', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (blogPosts) {
            var postList = document.getElementById("postList");
            postList.innerHTML = '';
           
            blogPosts.results.reverse();
            blogPosts.results.forEach(function (blogPost) {
                var postElement = createBlogPostElement(blogPost);
                postList.appendChild(postElement);
            }); 
        }).catch(function (error) {
            console.error("Erro:", error);
        });
    });
})

function createBlogPostElement(blogPost) {

    const dateStringUpdated = blogPost.date_updated;
    const date = new Date(dateStringUpdated);
    const date_updated = date.toLocaleString();

    const dateStringPublished = blogPost.date_published;
    const date2 = new Date(dateStringPublished);
    const date_published = date2.toLocaleString();

    var div1 = document.createElement('div')
    div1.className = 'card m-auto text-bg-dark mb-3'
    
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';
    div1.appendChild(cardBody)

    var headerPost = document.createElement('p');
    headerPost.className = 'card-text'
    headerPost.textContent = "Postado por " + blogPost.username + ", em " + date_published;
    cardBody.appendChild(headerPost);

    var divTtile = document.createElement('div')
    divTtile.className = 'd-flex justify-content-between align-items-center'
    var titlePost = document.createElement('h2');
    titlePost.className = 'card-title'
    titlePost.textContent = blogPost.title;
    cardBody.appendChild(titlePost);

    var hr = document.createElement('hr')
    cardBody.appendChild(hr)

    var bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text text-bg-dark';
    bodyPost.textContent = blogPost.body;
    cardBody.appendChild(bodyPost);


    if (blogPost.image !== null) {
        var imagePost = document.createElement('img');
        imagePost.src = blogPost.image;
        cardBody.appendChild(imagePost);
    }

    var hr1 = document.createElement('hr')
    cardBody.appendChild(hr1)

    var footerPost = document.createElement('div');
    footerPost.className = 'card-footer text-muted text-bg-dark';


    if (date_updated !== date_published) {
        footerPost.textContent = "Atualizado em " + date_updated;
    } else {
        footerPost.textContent = 'Post original';
    }

    div1.appendChild(cardBody);
    div1.appendChild(footerPost);

    var postLink = document.createElement('a');
    postLink.style = "text-decoration: none !important";
    postLink.className = "link-dark";
    postLink.href = 'detail_post.html?slug=' + blogPost.slug;
    
    postLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = postLink.href;
        
    })
    postLink.appendChild(div1);


    return postLink;
}
