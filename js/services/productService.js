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
export const servicesProducts = {
    productList
}