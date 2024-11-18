const BASE_URL = "https://673a8e4d339a4ce445186aef.mockapi.io/products";

const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos: ", error);
    }
}

const createProduct = async (name, price, image) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, image })
        })
        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error al crear producto: ", error);
    }
}

export const servicesProducts = {
    productList, createProduct,
}