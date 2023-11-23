document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("btnSalvar").addEventListener("click", function (evento) {
        evento.preventDefault();
        const token = localStorage.getItem('token');
        const oldPassword = document.getElementById('old_password').value;
        const newPassword1 = document.getElementById('new_password1').value;
        const newPassword2 = document.getElementById('new_password2').value;
        const msg = document.getElementById('msg');

        fetch(backendAddress + 'account/properties/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenKeyword + token,
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password1: newPassword1,
                new_password2: newPassword2,
            }),
        }).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data)
                console.log(data.new_password2)
                if (data.message === "Senha alterada com sucesso.") {
                    window.location.assign('/frontend/public/index.html');
                } else if (data.new_password2){
                    data.new_password2.forEach(element => {
                        msg.innerHTML = element;
                    });
                } else {
                    msg.innerHTML = data.old_password;
                }

            })
            .catch(function (error) {
                console.log(error);
                msg.innerHTML = "Erro durante o login. Por favor, tente novamente.";
            });
    });
});