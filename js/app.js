// Arrays para almacenar los productos y clientes
const productos = [];
const clientes = [];

// Referencias a los elementos del DOM
const listaProductos = document.getElementById("productos-list");
const listaClientes = document.getElementById("clientes-list");
const buscarProducto = document.getElementById("buscarProducto");
const buscarCliente = document.getElementById("buscarCliente");

// Event listeners para búsqueda
buscarProducto.addEventListener('input', () => {
    mostrarProductos(buscarProducto.value);
});

buscarCliente.addEventListener('input', () => {
    mostrarClientes(buscarCliente.value);
});

// Función para manejar el formulario de nuevos productos
function handleNewProduct(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    try {
        const producto = new Product(nombre, precio, stock);
        productos.push(producto);
        formProducto.reset();
        mostrarProductos();
    } catch (error) {
        alert(error.message);
    }
}

// Función para manejar el formulario de nuevos clientes
function handleNewCustomer(event) {
    event.preventDefault();

    const nombreCliente = document.getElementById("nombreCliente").value;
    const emailCliente = document.getElementById("emailCliente").value;

    try {
        const cliente = new Customer(nombreCliente, emailCliente);
        clientes.push(cliente);
        formCliente.reset();
        mostrarClientes();
    } catch (error) {
        alert(error.message);
    }
}

// Función para manejar la actualización del stock de un producto
function handleUpdateProduct(idProducto) {
    const producto = productos.find((p) => p.id === parseInt(idProducto));
    if (!producto) return;

    const nuevaCantidad = prompt(`Actualizar stock de ${producto.name}:`, producto.stock);

    if (nuevaCantidad !== null) {
        try {
            producto.updateStock(parseInt(nuevaCantidad) - producto.stock);
            mostrarProductos();
        } catch (error) {
            alert(error.message);
        }
    }
}

// Función para manejar la actualización del email de un cliente
function handleUpdateCustomer(idCliente) {
    const cliente = clientes.find((c) => c.id === parseInt(idCliente));
    if (!cliente) return;

    const nuevoEmail = prompt(`Actualizar email de ${cliente.name}:`, cliente.email);

    if (nuevoEmail !== null) {
        try {
            cliente.updateEmail(nuevoEmail);
            mostrarClientes();
        } catch (error) {
            alert(error.message);
        }
    }
}

// Función para mostrar los productos en la lista
function mostrarProductos(query = '') {
    listaProductos.innerHTML = '';
    productos
        .filter(producto => producto.matches(query))
        .forEach(producto => {
            listaProductos.appendChild(producto.renderUI());
        });
}

// Función para mostrar los clientes en la lista
function mostrarClientes(query = '') {
    listaClientes.innerHTML = '';
    clientes
        .filter(cliente => cliente.matches(query))
        .forEach(cliente => {
            listaClientes.appendChild(cliente.renderUI());
        });
}

// Asociar los eventos a los formularios
formProducto.addEventListener("submit", handleNewProduct);
formCliente.addEventListener("submit", handleNewCustomer);

// Mostrar las listas iniciales
mostrarProductos();
mostrarClientes();