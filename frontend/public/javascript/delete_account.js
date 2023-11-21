onload = function () {
    
    document.getElementById("deleteButton").addEventListener("click", function (evento) {
        evento.preventDefault();
        var urlParams = new URLSearchParams(window.location.search);
        var slug = urlParams.get('slug');
        var token = localStorage.getItem("token");
        fetch(backendAddress + 'blog/' + slug + '/delete' , {
            method: "DELETE",
            headers: {
                'Authorization': tokenKeyword + token 
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success === "Post excluído com sucesso!") {
                window.location.replace("index.html");
            }
        })
    }
    )
}