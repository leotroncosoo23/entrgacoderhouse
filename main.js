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

let peliculas = [];
let carrito = [];
let carritoEnLS = localStorage.getItem('carrito');


if (carritoEnLS) {
    carrito = JSON.parse(carritoEnLS);
}


const obtenerPeliculas = async () => {
    try {
        const respuesta = await fetch('./data.json');
        const data = await respuesta.json();

        peliculas = data; 
        mostrarPeliculas(peliculas); 
    } catch (error) {
        console.log("Hubo un error cargando las pelis", error);
        

        const contenedor = document.getElementById('contenedor-peliculas');
        contenedor.innerHTML = '<p>Error al cargar los productos. Intente nuevamente.</p>';
    }
}

function mostrarPeliculas(busquedadepelis) {
    const contenedor = document.getElementById('contenedor-peliculas');
    contenedor.innerHTML = '';

    busquedadepelis.forEach(peli => {
        const card = document.createElement('div');
        card.classList.add('producto'); // Usamos la clase del CSS

        card.innerHTML = `
            <img src="${peli.img}" alt="${peli.genero}">
            <h3>${peli.nombre}</h3>
            <p class="precio">Precio: $${peli.precio}</p>
            <button onclick="agregarAlCarrito(${peli.id})">Agregar al Carrito</button>
        `;

        contenedor.appendChild(card);
    })
}

function agregarAlCarrito(idRecibido) {
    const peliculaEncontrada = peliculas.find(peli => peli.id === idRecibido);
    
    carrito.push(peliculaEncontrada);
    
    Toastify({
        text: `Agregaste ${peliculaEncontrada.nombre} al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
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
    
    if (precioTotalElement) {
        precioTotalElement.innerHTML = `Total a pagar: $${total}`;
    }
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

const inputBuscador = document.getElementById('buscador');

inputBuscador.addEventListener('input', () => {
    const valorBusqueda = inputBuscador.value.toLowerCase();
    
    const filtrados = peliculas.filter(peli => 
        peli.nombre.toLowerCase().includes(valorBusqueda)
    );
    mostrarPeliculas(filtrados);
});

function finalizarCompra() {
    if (carrito.length === 0) {
        Toastify({
            text: "El carrito está vacío",
            style: { background: "red" }
        }).showToast();
    } else {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();

        Toastify({
            text: "Gracias por tu compra",
            style: { background: "green" }
        }).showToast();
    }
}

obtenerPeliculas(); 
mostrarCarrito(); 