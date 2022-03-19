/** @format */

const dataBase = [
	{
		id: 1,
		nombre: 'Hoodies',
		precio: 100,
		stock: 20,
		img: 'img/jodisasuke.jpg',
	},
	{
		id: 2,
		nombre: 'tshirts',
		precio: 50,
		stock: 10,
		img: 'img/tshirtnaruto.jpg',
	},
	{
		id: 3,
		nombre: 'bracelets',
		precio: 25,
		stock: 5,
		img: 'img/pulsera.jpg',
	},
];

// sleccionar elemento por id

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DombotonComprar = document.querySelector('#comprar');

const renderizarProductos = () => {
	dataBase.forEach((obj) => {
		// estructura
		const miNodo = document.createElement('div');
		miNodo.classList.add('card', 'col-sm-4');
		// body
		const miNodoCardBody = document.createElement('div');
		miNodoCardBody.classList.add('card-body');
		// titulo
		const miNodeTitle = document.createElement('h5');
		miNodeTitle.classList.add('card-title');
		miNodeTitle.textContent = obj.nombre;
		//imagen
		const miNodoImagen = document.createElement('img'); //  crear el elemento
		miNodoImagen.classList.add('img-fluid'); // agregar una clase de boostrap
		miNodoImagen.setAttribute('src', obj.img); // agregar contenido de mi db

		// precio
		const miNodoPrecio = document.createElement('p');
		miNodoPrecio.classList.add('card-text');
		miNodoPrecio.textContent = `Precio: ${divisa}${obj.precio}`;

		// stock
		const miNodoStock = document.createElement('p');
		miNodoStock.classList.add('card-text');
		miNodoStock.textContent = 'Stock: ' + obj.stock;

		// boton
		const miNodoBoton = document.createElement('button');
		miNodoBoton.classList.add('btn', 'btn-primary');
		miNodoBoton.textContent = '+';
		miNodoBoton.setAttribute('marcador', obj.id);
		miNodoBoton.addEventListener('click', añadirProductosCarrito);

		// insertando
		miNodoCardBody.appendChild(miNodoImagen);
		miNodoCardBody.appendChild(miNodeTitle);
		miNodoCardBody.appendChild(miNodoBoton);
		miNodoCardBody.appendChild(miNodoPrecio);
		miNodoCardBody.appendChild(miNodoStock);
		miNodo.appendChild(miNodoCardBody);
		DOMitems.appendChild(miNodo);
	});
};

const añadirProductosCarrito = (evento) => {
	carrito.push(evento.target.getAttribute('marcador'));
	renderizarCarrito();
};

function renderizarCarrito() {
	DOMcarrito.textContent = '';
	// quitar lo duplicados del carrito
	const carritoSinDuplicados = [...new Set(carrito)]; // set cada vez que se clickea
	// recorrer el carrito sin duplicados
	carritoSinDuplicados.forEach((item) => {
		// buscar en la date base el item que sea igual al mi item de db
		const miItem = dataBase.filter((itemDb) => {
			return itemDb.id === parseInt(item);
		});
		// cuantas veces se repite un producto [1,2,3,3]
		const productosRepetidos = carrito.reduce((total, itemId) => {
			return (itemId === item) ? total += 1 : total
		}, 0);
		// creamos los nodos del item del carrito
		const miNodo = document.createElement('li');
		miNodo.classList.add('list-group', 'text-right', 'mx-2');
		miNodo.textContent = `${productosRepetidos} - ${miItem[0].nombre} x ${divisa}  ${miItem[0].precio}`;
		// boton para vaciar
		const miBoton = document.createElement('button');
		miBoton.classList.add('btn', 'btn-danger', 'mx-5');
		miBoton.textContent = 'X';
		miBoton.style.marginLeft = '1rem';
		miBoton.dataset.item = item;
		miBoton.addEventListener('click', borrarItemCarrito);
		// insertamos
		miNodo.appendChild(miBoton);
		DOMcarrito.appendChild(miNodo);
	});
	// renderizar el contenido de total
	DOMtotal.textContent = calcularTotal();
}
const borrarItemCarrito = (evento) => {
	// obtener el id para borrar item del carrito
	const id = evento.target.dataset.item
	// reinicializo el valor de carrito
	carrito = carrito.filter((carritoId) => {
		return carritoId !== id; // de lo items del carrito retorna el que es diferente que id
	});
	renderizarCarrito();	
}

const calcularTotal = () => {
	return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = dataBase.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

DOMbotonVaciar.addEventListener('click', () => {
	carrito = [];
	renderizarCarrito();
});

DombotonComprar.addEventListener('click', () => {
	// verificar que por lo menos tenga un  item en el carrito
	(carrito.length < 1) ? alert('No hay productos que comprar')
		: alert('Productos comprados con exito')
});

// inicio wey
renderizarProductos();
renderizarCarrito();


// change theme

const bdark = document.querySelector('#bdark');
const body = document.querySelector('body');

load();

bdark.addEventListener('click', (event) => {
	body.classList.toggle('modo-oscuro');
	store(body.classList.contains('modoOscuro'))
});

function load() {
	const modoOscuro = localStorage.getItem('modo-oscuro'); 
	if (!modoOscuro) {
		store('false');		
	} else if (modoOscuro == 'true') {
		body.classList.add('modo-oscuro');		
	}
}


function store(value) {
	// agrega a la local store
	localStorage.setItem('modoOscuro', value);
}