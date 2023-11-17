document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnPost").addEventListener("click", function (event) {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const body = document.getElementById("body").value;
      const image = document.getElementById("image").value;
      
      const msg = document.getElementById("msg");
  
      // Adicione validações adicionais conforme necessário
      fetch(backendAddress + "blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            body: body,
            image: image,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
          msg.innerHTML = "Error during registration. Please try again.";
        });
    });
  });
  