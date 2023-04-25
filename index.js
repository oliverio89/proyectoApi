// URL de la API que quieres llamar
const apiUrl = "https://api.fbi.gov/wanted/v1/list";

let presos = [];

function getInfo() {
  // Hacer la petición fetch
  fetch(apiUrl)
    .then((response) => {
      // Verificar si la respuesta es exitosa (código de estado 200-299)
      if (response.ok) {
        // Devolver la respuesta como JSON
        return response.json();
      } else {
        // En caso de que la respuesta no sea exitosa, lanzar un error
        throw new Error(
          `Error al hacer la petición. Código de estado: ${response.status}`
        );
      }
    })
    .then((data) => {
      // Aquí puedes trabajar con los datos obtenidos de la API
      // Obtener el nombre del objeto de la respuesta de la API
      data.items.forEach((element) => {
        addInfoFBI(element);
      });
    })
    .catch((error) => {
      // Capturar cualquier error que ocurra durante la petición
      console.error(error);
    });
}

function addInfoFBI(info) {
  presos.push(info);
}

function dibujarInfo() {
  presos.forEach((ele) => {
    // Crear un nuevo elemento div
    const elemento = document.createElement("div");
    elemento.className = "tarjeta";
    elemento.innerHTML = `
            <div class="cardData">
            <div class="imagenes"><br> 
            <img src=${ele.images[0].original}></img>
            </div>
            <p class="aliases">aliases: ${ele.aliases} </p>
            <br> 
                <p class="description"> description:${ele.description}</p>
                <br> 
                <p class="files"> files:${ele.files[0].name}</p>
                <br> 
            </div>
        `;
    // Agregar el elemento div creado al DOM
    document.querySelector(".containerFlex").appendChild(elemento);
  });
}

const button = document.querySelector(".pintarInfo");

button.addEventListener("click", (event) => {
  dibujarInfo();
  button.style.display = "none";
});

getInfo();
