window.addEventListener('load', function (evento) {
  const token = localStorage.getItem('token');
  const backendAddress = 'Sua URL de backend aqui'; // Substitua pelo endereço real do seu backend

  fetch(backendAddress + 'account/properties', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token, // Assume que você usa o tipo de autenticação 'Bearer'
    },
  })
  .then(function (response) {
    response.json().then(function (data) {
      const objDivUser = document.getElementById('username') as HTMLInputElement;
      objDivUser.value = data.username;
      const objDivEmail = document.getElementById('email') as HTMLInputElement;
      objDivEmail.value = data.email;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const btnSaveChanges = document.getElementById("btnSaveChanges");

  if (btnSaveChanges) {
    btnSaveChanges.addEventListener("click", function (event) {
      event.preventDefault();

      const newEmail = (document.getElementById("email") as HTMLInputElement).value;
      const newUsername = (document.getElementById("username") as HTMLInputElement).value;
      const msg = document.getElementById("msg");
      const token = localStorage.getItem('token');

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
        } else if (data.username && data.username.length > 0) {
          msg.innerHTML = data.username[0];
        } else if (data.response === "Conta atuliazada com sucesso!") {
          msg.innerHTML = "Atualização bem-sucedida.";
        } else {
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
