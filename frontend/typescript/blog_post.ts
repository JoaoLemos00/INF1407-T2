document.addEventListener('DOMContentLoaded', function () {
    fetch(backendAddress + 'blog/list', {
      method: 'GET',
    })
      .then(function (response) {
        response
          .json()
          .then(function (blogPosts) {
            const postList = document.getElementById('postList');
            if (postList) {
              postList.innerHTML = '';
  
              blogPosts.results.reverse();
              blogPosts.results.forEach(function (blogPost) {
                const postElement = createBlogPostElement(blogPost);
                postList.appendChild(postElement);
              });
            }
          })
          .catch(function (error) {
            console.error('Erro:', error);
          });
      });
  });
  
  function createBlogPostElement(blogPost: any) {
    const dateStringUpdated = blogPost.date_updated;
    const date = new Date(dateStringUpdated);
    const date_updated = date.toLocaleString();
  
    const dateStringPublished = blogPost.date_published;
    const date2 = new Date(dateStringPublished);
    const date_published = date2.toLocaleString();
  
    const div1 = document.createElement('div');
    div1.className = 'card m-auto text-bg-dark mb-3';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';
    div1.appendChild(cardBody);
  
    const headerPost = document.createElement('p');
    headerPost.className = 'card-text';
    headerPost.textContent = 'Postado por ' + blogPost.username + ', em ' + date_published;
    cardBody.appendChild(headerPost);
  
    const divTtile = document.createElement('div');
    divTtile.className = 'd-flex justify-content-between align-items-center';
    const titlePost = document.createElement('h2');
    titlePost.className = 'card-title';
    titlePost.textContent = blogPost.title;
    cardBody.appendChild(titlePost);
  
    const hr = document.createElement('hr');
    cardBody.appendChild(hr);
  
    const bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text text-bg-dark';
    bodyPost.textContent = blogPost.body;
    cardBody.appendChild(bodyPost);
  
    if (blogPost.image !== null) {
      const imagePost = document.createElement('img');
      imagePost.src = blogPost.image;
      cardBody.appendChild(imagePost);
    }
  
    const hr1 = document.createElement('hr');
    cardBody.appendChild(hr1);
  
    const footerPost = document.createElement('div');
    footerPost.className = 'card-footer text-muted text-bg-dark';
  
    if (date_updated !== date_published) {
      footerPost.textContent = 'Atualizado em ' + date_updated;
    } else {
      footerPost.textContent = 'Post original';
    }
  
    div1.appendChild(cardBody);
    div1.appendChild(footerPost);
  
    const postLink = document.createElement('a');
    postLink.style.textDecoration = 'none !important';
    postLink.className = 'link-dark';
    postLink.href = 'detail_post.html?slug=' + blogPost.slug;
  
    postLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = postLink.href;
    });
  
    postLink.appendChild(div1);
  
    return postLink;
  }
  