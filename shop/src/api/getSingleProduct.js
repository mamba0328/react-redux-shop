import { get } from "./requests";

export async function getSingleProduct(id) {
    try {
        const products = await get(`/api/products/${id}`);
        return products.data
    } catch (e) {
        return console.log(e)
    }
}