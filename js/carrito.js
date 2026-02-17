document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("cartContainer");
    const totalSpan = document.getElementById("total");

    let carrito = localStorage.getItem("cart");
    carrito = carrito ? JSON.parse(carrito) : [];

    function renderCarrito() {
        container.innerHTML = "";

        if (carrito.length === 0) {
            container.innerHTML = "<p class='ctext'>El carrito está vacío</p>";
            totalSpan.innerText = "0";
            return;
        }

        carrito.forEach(producto => {

            const article = document.createElement("article");
            article.classList.add("carrito-item");

            article.innerHTML = `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="ctext">${producto.nombre}</div>
                <div class="ctext">${producto.cantidad}</div>
                <div class="ctext">$${producto.precio * producto.cantidad}</div>
                <button class="btnel">Eliminar</button>
            `;

            const botonEliminar = article.querySelector(".btnel");

            botonEliminar.addEventListener("click", () => {
                carrito = carrito.filter(item => item.id !== producto.id);
                localStorage.setItem("cart", JSON.stringify(carrito));
                renderCarrito();
            });

            container.appendChild(article);
        });

        calcularTotal();
    }

    function calcularTotal() {
        const total = carrito.reduce((acc, producto) => {
            return acc + (producto.precio * producto.cantidad);
        }, 0);

        totalSpan.innerText = total;
    }

    document.getElementById("finalizar").addEventListener("click", () => {
        localStorage.removeItem("cart");
        carrito = [];
        renderCarrito();
        alert("Compra finalizada");
    });

    renderCarrito();

});
