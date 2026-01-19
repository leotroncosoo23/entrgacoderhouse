/* const pelisMayores = ['Joker', 'El Lobo de Wall Street', 'El Padrino', 'El Padrino II', 'Scarface', 'El Club de la Pelea'];
const pelisMenores = ['Toy Story', 'Toy Story 2', 'Buscando a Nemo', 'Los Increibles', 'Zootopia', 'Kung Fu Panda'];
const todasLasPelis = pelisMayores.concat(pelisMenores);

let listaPermitida = [];

function solicitarEdad(nombre) {
    let edadIngresada;
    do {
        edadIngresada = parseInt(prompt("Hola " + nombre + ", por favor ingresa tu edad (número):"));
        if (isNaN(edadIngresada) || edadIngresada < 0 || edadIngresada > 110) {
            alert("Edad no válida. Por favor ingresa un número real entre 0 y 110.");
        }
    } while (isNaN(edadIngresada) || edadIngresada < 0 || edadIngresada > 110);
    return edadIngresada; 
}

function mostrarCatalogo(listaRecibida) {
    console.log("--- CATÁLOGO DISPONIBLE ---");
    for (let i = 0; i < listaRecibida.length; i++) {
        console.log(listaRecibida[i]);
    }
    alert("Revisa la CONSOLA (F12) para ver las películas disponibles y elige una.");
}

function iniciarAlquiler(lista) {
    let peliculaElegida = prompt("Escribe el nombre exacto de la película que ves en consola:");

    if (lista.includes(peliculaElegida)) {    
        let confirmacion = confirm("Has elegido '" + peliculaElegida + "'. ¿Deseas confirmar la reproducción?");
        if (confirmacion) {
            alert("¡Excelente! Reproduciendo " + peliculaElegida + "... Disfruta tu película.");
        } else {
            alert("Operación cancelada. Regresa pronto.");
        }
    } else {
        alert("Error: Esa película no está en tu catálogo disponible o está mal escrita.");
    }
}


alert("Bienvenido a CoderStreaming");
let nombreUsuario = prompt("Para comenzar, dinos tu nombre:");

let edadUsuario = solicitarEdad(nombreUsuario);

if (edadUsuario >= 18) {
    listaPermitida = todasLasPelis;
    console.log("Perfil: ADULTO");
} else {
    listaPermitida = pelisMenores;
    console.log("Perfil: MENOR");
}

mostrarCatalogo(listaPermitida);

if (listaPermitida.length > 0) {
    iniciarAlquiler(listaPermitida);
}

 */

//practico 2

class Pelicula {
    constructor(id, nombre, genero, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.precio = precio;
        this.img = img; 
    }
}

const peliculas = [];

peliculas.push(new Pelicula(1, "Matrix", "Ciencia Ficción", 1500, "https://imagenes.hobbyconsolas.com/files/image_640_360/uploads/imagenes/2025/04/12/69047ab8bb7b0.jpeg"));
peliculas.push(new Pelicula(2, "El Padrino", "Drama", 1800, "https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/624/0000624389.jpg"));
peliculas.push(new Pelicula(3, "Toy Story", "Infantil", 1200, "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/518292de-1782-47c0-a96e-bd903a73d466/compose?aspectRatio=1.78&format=webp&width=1200"));
peliculas.push(new Pelicula(4, "Titanic", "Romance", 1500, "https://cdn.aarp.net/content/dam/aarp/entertainment/movies-for-grownups/2022/02/1140-titanic-esp.jpg"));

let carrito = [];

let carritoEnLS = localStorage.getItem('carrito');

if(carritoEnLS) {
    carrito = JSON.parse(carritoEnLS);
}


function mostrarPeliculas (busquedadepelis){
    const contenedor = document.getElementById('contenedor-peliculas');
    contenedor.innerHTML = '';

    busquedadepelis.forEach( peli => {
        const card = document.createElement('div');
        
        card.style.border = "1px solid black";
        card.style.margin = "10px";
        card.style.padding = "10px";
        card.style.width = "200px";
        card.style.display = "inline-block";

        card.innerHTML = `
            <img src="${peli.img}" alt="${peli.genero}" style="width: 100px;">
            <h3>${peli.nombre}</h3>
            <p>Precio: $${peli.precio}</p>
            <button onclick="agregarAlCarrito(${peli.id})">Agregar al Carrito</button>
        `;

        contenedor.appendChild(card);
    })
}

function agregarAlCarrito(idRecibido){
    const peliculaEncontrada = peliculas.find(peli => peli.id === idRecibido);
    
    carrito.push(peliculaEncontrada);
    
    console.log("El Carrito ahora tiene: ", carrito);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    mostrarCarrito();
}

function mostrarCarrito(){
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const precioTotalElement = document.getElementById('precio-total');
    
    contenedorCarrito.innerHTML = '';

    carrito.forEach(peli => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>Ticket: ${peli.nombre} - $${peli.precio}</p>
        `;
        contenedorCarrito.appendChild(div);
    });

    const total = carrito.reduce((acc, peli) => acc + peli.precio, 0);
    
    if(precioTotalElement) {
        precioTotalElement.innerHTML = `Total a pagar: $${total}`;
    }
}

function vaciarCarrito(){
    carrito = [];

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

const inputBuscador = document.getElementById('buscador');

inputBuscador.addEventListener('input', () =>{
    const valorBusqueda = inputBuscador.value.toLowerCase();
    
    const filtrados = peliculas.filter(peli => 
        peli.nombre.toLowerCase().includes(valorBusqueda)
    )
    mostrarPeliculas(filtrados);
})


mostrarPeliculas(peliculas);
mostrarCarrito(); 