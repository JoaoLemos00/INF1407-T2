onload = function () {

};

document.addEventListener("DOMContentLoaded", function () {
    var btnSaveChanges = document.getElementById("btnSaveChanges");
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener("click", function (event) {
            event.preventDefault();
            var newEmail = document.getElementById("email").value;
            var newUsername = document.getElementById("username").value;
            // Remove div existente, se houver
            var existingMsgDiv = document.getElementById("msgDiv");
            if (existingMsgDiv) {
                existingMsgDiv.remove();
            }
            // Cria uma nova div
            var msgDiv = document.createElement("div");
            msgDiv.id = "msgDiv";
            document.body.appendChild(msgDiv);
            fetch(backendAddress + "account/update", {
                method: "PUT",
                headers: {
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
                    msgDiv.innerHTML = data.email[0];
                }
                else if (data.username && data.username.length > 0) {
                    msgDiv.innerHTML = data.username[0];
                }
                else if (data.response === "Update successful") {
                    msgDiv.innerHTML = "Atualização bem-sucedida.";
                }
                else {
                    throw new Error("Falha na atualização");
                }
            })
                .catch(function (error) {
                console.log(error);
                msgDiv.innerHTML = "Erro durante a atualização. Por favor, tente novamente.";
            });
        });
    }
});
