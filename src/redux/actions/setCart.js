import { SET_CART } from "../constants/productsConstants"

const setCart = (products) => async (dispatch) => {
    try {
        const newCart = await products;
        localStorage.setItem('cart', JSON.stringify(newCart));

        dispatch({
            type: SET_CART,
            payload: newCart,
        })
    } catch {
        console.log('failed to set new cart')
    }
}

export default setCart
