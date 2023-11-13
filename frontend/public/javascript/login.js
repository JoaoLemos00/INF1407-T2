onload = function () {

    document.getElementById("btnLogin").addEventListener("click", function (evento) {
        evento.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var msg = document.getElementById("msg");
        console.log(email);
        console.log(password);
        fetch(backendAddress + "account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            if (response.ok) {
                var token = data.token;
                localStorage.setItem("token", token);
                // Redireciona para a página após o login
                window.location.replace("loginDone.html");
            } else {
                throw new Error("Falha na autenticação");
            }
        })
        .catch(function (error) {
            console.log(error);
            msg.innerHTML = "Erro durante o login. Por favor, tente novamente.";
        });
    });

};
