document.addEventListener("DOMContentLoaded", function () {
    const btnDeleteAccount = document.getElementById("btnDeleteAccount");
  
    if (btnDeleteAccount) {
      btnDeleteAccount.addEventListener("click", function (event) {
        event.preventDefault();
  
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const msg = document.getElementById("msg");
  
        const token = localStorage.getItem('token');
  
        fetch(backendAddress + "account/properties/delete-account", {
          method: "POST",
          headers: {
            'Authorization': tokenKeyword + token, 
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
          if (data && data.response === "Conta deletada!") {
            msg.innerHTML = "Conta deletada com sucesso!";
            window.location.assign('index.html');
          } else if (data.response) {
            msg.innerHTML = data.response;
          } else {
            throw new Error("Falha na deleção da conta");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      });
    }
  });
  