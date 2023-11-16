document.addEventListener("DOMContentLoaded", function () {
  var btnDeleteAccount = document.getElementById("btnDeleteAccount");
  if (btnDeleteAccount) {
      btnDeleteAccount.addEventListener("click", function (event) {
          event.preventDefault();
          const confirmation = confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.");
          var email = document.getElementById("email").value;
          var username = document.getElementById("username").value;
          const msg = document.getElementById("msg");
          if (confirmation) {
              var token = localStorage.getItem('token');

              fetch(backendAddress + "account/properties/delete", {
                  method: "POST",
                  headers: {
                      'Authorization': tokenKeyword + token,
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    username: username,
                }),
              })
                  .then(function (response) {
                      return response.json();
                  })
                  .then(function (data) {
                      console.log(data);
                      if (data.message === "Conta deletada!") {
                          // You may redirect the user to a login page or perform other actions as needed
                          msg.innerHTML = "Conta excluída com sucesso.";
                      }
                      else {
                          throw new Error("Falha na exclusão da conta");
                      }
                  })
                  .catch(function (error) {
                      console.log(error);
                      msg.innerHTML = "Erro durante a exclusão da conta. Por favor, tente novamente.";
                  });
          }
      });
  }
});