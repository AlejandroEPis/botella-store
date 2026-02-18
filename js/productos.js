document.addEventListener("DOMContentLoaded", () => {

    const BASE_ID = "app1xxy3U4v146Uh7";
    const TABLE = "Productos";
    const TOKEN = "patnsvDVqW3Ywf3FG.5ede6b7ab8e5df17c79463aab7c1399b70b10dc898fcf5d09274bd166ab8c378";

    const container = document.getElementById("productContainer");

    fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
        .then(res => res.json())
        .then(data => {

            container.innerHTML = "";

            data.records.forEach(record => {

                const producto = record.fields;

                const article = document.createElement("article");
                article.classList.add("card");

                const stock = Number(producto.stock) || 0;

                article.innerHTML = `
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="desc">
                                <h2>${producto.nombre}</h2>
                                <p>${producto.descripcion}</p>
                            </div>
                            <div class="infob">
                                <p>Precio:</p>
                                <p class="precio">$${producto.precio}</p>
                                <p>Disponibilidad:</p>
                                <p class="disponible ${stock > 0 ? "disponible-ok" : "disponible-no"}">
                                    ${stock > 0 ? "Disponible" : "Sin disponibilidad"}
                                </p>
                            </div>
                            <button class="btn" ${stock === 0 ? "disabled" : ""}>
                                ${stock === 0 ? "Sin Stock" : "Comprar"}
                            </button>
`;

                const boton = article.querySelector(".btn");

                boton.addEventListener("click", () => {

                    let carrito = localStorage.getItem("cart");
                    carrito = carrito ? JSON.parse(carrito) : [];

                    const existe = carrito.find(item => item.id === record.id);

                    if (existe) {
                        existe.cantidad += 1;
                    } else {
                        carrito.push({
                            id: record.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            imagen: producto.imagen,
                            cantidad: 1
                        });
                    }

                    localStorage.setItem("cart", JSON.stringify(carrito));

                    alert("Producto agregado al carrito");
                });

                container.appendChild(article);

            });

        })
        .catch(error => console.error("Error:", error));

});
