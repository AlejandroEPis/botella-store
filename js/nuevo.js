document.addEventListener("DOMContentLoaded", () => {

    const BASE_ID = "app1xxy3U4v146Uh7";
    const TABLE = "Productos";
    const TOKEN = "patnsvDVqW3Ywf3FG.5ede6b7ab8e5df17c79463aab7c1399b70b10dc898fcf5d09274bd166ab8c378";

    const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

    const form = document.getElementById("formProducto");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const precio = Number(document.getElementById("precio").value);
        const stock = Number(document.getElementById("stock").value);
        const imagen = document.getElementById("imagen").value;

        const datos = {
            fields: {
                nombre,
                descripcion,
                precio,
                stock,
                imagen: `assets/${imagen}`
            }
        };

        await fetch(URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        window.location.href = "admin.html";
    });

});
