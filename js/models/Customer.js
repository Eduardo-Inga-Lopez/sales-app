function Customer(name, email) {
    if (!name || !email || !email.includes("@")) {
        throw new Error("Datos inválidos");
    }

    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.totalPurchases = 0;
    this.createdAt = new Date();
}

Customer.prototype.updateEmail = function (newEmail) {
    if (!newEmail.includes("@")) {
        throw new Error("Correo electrónico inválido");
    }
    this.email = newEmail;
};

// Nuevo método para búsqueda
Customer.prototype.matches = function(query) {
    if (!query) return true;
    query = query.toLowerCase();
    return this.name.toLowerCase().includes(query) || 
           this.email.toLowerCase().includes(query);
};

Customer.prototype.renderUI = function () {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${this.name}</td>
        <td>${this.email}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="handleUpdateCustomer(${this.id})">
                Actualizar Email
            </button>
        </td>`;
    return tr;
};
