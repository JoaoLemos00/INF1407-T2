onload = function () {
  exibeListaDeCarros(); // exibe lista de carros ao carregar a página
};

function exibeListaDeCarros() {
  fetch(backendAddress + "carros/lista/")
    .then((response) => response.json())
    .then((carros) => {
      let campos = [
        "namTe",
        "mpg",
      ];
      let tbody = document.getElementById("idtbody") as HTMLTableSectionElement;
      tbody.innerHTML = "";
      for (let carro of carros) {
        let tr = document.createElement("tr") as HTMLTableRowElement;
        for (let i = 0; i < campos.length; i++) {
          let td = document.createElement("td") as HTMLTableCellElement;
          let texto = document.createTextNode(carro[campos[i]]) as Text;
          td.appendChild(texto);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}
