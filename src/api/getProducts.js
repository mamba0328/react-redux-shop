import { get } from "./requests";

export async function getProducts() {
    try {
        const products = await get('/api/products');
        return products.data
    } catch (e) {
        return console.log(e)
    }
}