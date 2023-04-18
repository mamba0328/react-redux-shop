export async function getProducts() {
    try {
        const data = await fetch('guitars.json');
        const products = await data.json();
        return products
    } catch {
        return []
    }
}