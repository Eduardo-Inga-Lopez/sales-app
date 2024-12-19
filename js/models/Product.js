// Constructor para Product
function Product(name, price, stock) {
    if (!name || typeof price !== "number" || price <= 0 || stock < 0) {
        throw new Error("Datos inválidos");
    }

    this.id = Date.now();
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
}

// Método para actualizar el stock
Product.prototype.updateStock = function (quantity) {
    if (this.stock + quantity < 0) {
        throw new Error("Stock insuficiente");
    }
    this.stock += quantity;
};

// Método para obtener el precio formateado como moneda
Product.prototype.getFormattedPrice = function () {
    return `S/ ${this.price.toFixed(2)}`;
};

// Método para obtener la información del producto
Product.prototype.getProductInfo = function () {
    return `${this.name} - ${this.getFormattedPrice()} (Stock: ${this.stock})`;
};

// Nuevo método para búsqueda
Product.prototype.matches = function(query) {
    if (!query) return true;
    query = query.toLowerCase();
    return this.name.toLowerCase().includes(query);
};

Product.prototype.renderUI = function () {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${this.name}</td>
        <td>${this.getFormattedPrice()}</td>
        <td>${this.stock}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="handleUpdateProduct(${this.id})">
                Actualizar Stock
            </button>
        </td>`;
    return tr;
};