// URL de la API que quieres llamar
const apiUrl = "https://api.fbi.gov/wanted/v1/list";
const nombreElemento = document.querySelector('#impresName');
let presos = []

function getInfo() {

    // Hacer la petición fetch
    fetch(apiUrl)
        .then(response => {
            // Verificar si la respuesta es exitosa (código de estado 200-299)
            if (response.ok) {
                // Devolver la respuesta como JSON
                return response.json();
            } else {
                // En caso de que la respuesta no sea exitosa, lanzar un error
                throw new Error(`Error al hacer la petición. Código de estado: ${response.status}`);
            }
        })
        .then(data => {
            // Aquí puedes trabajar con los datos obtenidos de la API
            // Obtener el nombre del objeto de la respuesta de la API
            data.items.forEach((element) => {
                addInfoFBI(element)
            });
        })
        .catch(error => {
            // Capturar cualquier error que ocurra durante la petición
            console.error(error);
        });

}

function addInfoFBI(info) {
    presos.push(info)
    dibujarInfo()
}


function dibujarInfo() {

    presos.forEach((ele) => {

        // Crear un nuevo elemento div
        const elemento = document.createElement('div');
        elemento.className = 'tarjeta';
        elemento.innerHTML = `
            <div class="card.data">
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
        document.body.appendChild(elemento);
    });
}

// function dibujarInfo() {
//     console.log(presos)
//     presos.forEach((ele) => {
//         nombreElemento.innerText = `Nombre: ${ele.description}`;

//         elemento = `<div class="tarjeta">
//             <div class="card.data">
//                 <p class="nombre"></p>
//                 <p class="lenguajes"></p>
//                 <p class="aliases"></p>
//                 <p class="files"></p></div>
//             <div clas="imagenes">
//                 <img src='${presos.url}'></img>
//             </div>
//         </div>`

//         document.createElement('div')

//     })
// }


getInfo()

