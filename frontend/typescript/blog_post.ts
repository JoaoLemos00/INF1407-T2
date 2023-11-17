onload = function () {
    exibeListaPosts();
}

function exibeListaPosts() {
    fetch(backendAAddress + 'account/blog/list', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
}