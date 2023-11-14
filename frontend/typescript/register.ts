document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnRegister").addEventListener("click", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password1 = document.getElementById("password1").value;
      const password2 = document.getElementById("password2").value;
      const msg = document.getElementById("msg");
  
      // Adicione validações adicionais conforme necessário
      if (password1 !== password2) {
        msg.innerHTML = "As senhas não coincidem.";
        return;
      }
  
      fetch(backendAddress + "account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password1,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.response);
          if (data.response === "Registration successful") {
            msg.innerHTML = "Registration successful. You can now login.";
          } else {
            throw new Error("Registration failed");
          }
        })
        .catch(function (error) {
          console.log(error);
          msg.innerHTML = "Error during registration. Please try again.";
        });
    });
  });
  