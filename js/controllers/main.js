import { servicesProducts } from "../services/productService.js";

const productContainer = document.querySelector("[data-products]");

const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="img-container">
        <img src="${image}" alt="imagen producto" />
        <div class="card-container--info">
        <p>${name}</p>
            <div class="card-container--value">
                <p>${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="/img/borrar.png" alt="eliminar"></img>
                </button>
            </div>
        </div>
    `;
    return card;
}
const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log(error)
    }
}
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    // Validar que los campos no estén vacíos
    if (!name || !price || !image) {
        console.log("Por favor, completa todos los campos."); // Mensaje de error en consola
        document.querySelector("[data-message]").textContent = "Por favor, completa todos los campos."; // Mostrar mensaje de error
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        const newProduct = await servicesProducts.createProduct(name, price, image);
        console.log(newProduct);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);
    } catch (error) {
        console.log(error);
    }
    form.reset(); // Limpiar el formulario después de enviar
    document.querySelector("[data-message]").textContent = ""; // Limpiar el mensaje de error
});

renderProducts();

