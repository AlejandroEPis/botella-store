document.addEventListener("DOMContentLoaded", () => {

    const BASE_ID = "app1xxy3U4v146Uh7";
    const TABLE = "Productos";
    const TOKEN = "patnsvDVqW3Ywf3FG.5ede6b7ab8e5df17c79463aab7c1399b70b10dc898fcf5d09274bd166ab8c378";

    const container = document.getElementById("adminContainer");
    const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

    async function obtenerProductos() {
        const res = await fetch(URL, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });

        const data = await res.json();
        renderProductos(data.records);
    }

    function renderProductos(productos) {

        container.innerHTML = "";

        productos.forEach(record => {

            const producto = record.fields;

            const article = document.createElement("article");
            article.classList.add("aprod");

            article.innerHTML = `
                <div>${producto.nombre || ""}</div>
                <div>$${producto.precio || 0}</div>
                <div>${producto.stock || 0}</div>
                <div class="contbtn">
                    <button class="btned">Editar</button>
                    <button class="btnel">Eliminar</button>
                </div>
            `;

            const btnEditar = article.querySelector(".btned");
            const btnEliminar = article.querySelector(".btnel");

            btnEditar.addEventListener("click", () => activarEdicion(article, record));
            btnEliminar.addEventListener("click", () => eliminarProducto(record.id));

            container.appendChild(article);
        });
    }

    function activarEdicion(article, record) {

        const producto = record.fields;

        article.innerHTML = `
            <input type="text" value="${producto.nombre || ""}">
            <input type="number" value="${producto.precio || 0}">
            <input type="number" value="${producto.stock || 0}">
            <div class="contbtn">
                <button class="btnGuardar">Guardar</button>
                <button class="btnCancelar">Cancelar</button>
            </div>
        `;

        const btnGuardar = article.querySelector(".btnGuardar");
        const btnCancelar = article.querySelector(".btnCancelar");

        btnGuardar.addEventListener("click", async () => {

            const inputs = article.querySelectorAll("input");

            const datos = {
                fields: {
                    nombre: inputs[0].value,
                    precio: Number(inputs[1].value),
                    stock: Number(inputs[2].value)
                }
            };

            await fetch(`${URL}/${record.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            obtenerProductos();
        });

        btnCancelar.addEventListener("click", () => {
            obtenerProductos();
        });
    }

    async function eliminarProducto(id) {

        const confirmar = confirm("¿Seguro que querés eliminar este producto?");
        if (!confirmar) return;

        await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${TOKEN}` }
        });

        obtenerProductos();
    }

    obtenerProductos();
});
