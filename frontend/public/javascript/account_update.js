window.addEventListener('load', function (evento) {
    var token = localStorage.getItem('token');
    fetch(backendAddress + 'account/properties', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token,
        },
        
    }).then(function (response) {
        response.json().then(function (data) {
            var objDivUser = document.getElementById('username');
            objDivUser.value = data.username;
            var objDivEmail = document.getElementById('email');
            objDivEmail.value = data.email;
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var btnSaveChanges = document.getElementById("btnSaveChanges");
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener("click", function (event) {
            event.preventDefault();
            var newEmail = document.getElementById("email").value;
            var newUsername = document.getElementById("username").value;
            const msg = document.getElementById("msg");
            var token = localStorage.getItem('token');
            
            fetch(backendAddress + "account/properties/update", {
                method: "PUT",
                headers: {
                    'Authorization': tokenKeyword + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: newEmail,
                    username: newUsername,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.email && data.email.length > 0) {
                        msg.innerHTML = data.email[0];
                    }
                    else if (data.username && data.username.length > 0) {
                        msg.innerHTML = data.username[0];
                    }
                    else if (data.response === "Conta atuliazada com sucesso!") {
                        msg.innerHTML = "Atualização bem-sucedida.";
                    }
                    else {
                        throw new Error("Falha na atualização");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    msg.innerHTML = "Erro durante a atualização. Por favor, tente novamente.";
                });
        });
    }
});
