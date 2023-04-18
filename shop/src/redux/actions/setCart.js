import { SET_CART } from "../constants/productsConstants"
import {
    getDatabase, update, ref
} from "firebase/database";

function writeUserCart(user, cart) {
    if (!user) return
    const db = getDatabase();
    return update(ref(db, 'users/' + user.uid), {
        cart,
    }).catch((error) => console.log(error))
}

const setCart = (user, products) => async (dispatch) => {
    try {
        const newCart = await products;
        await writeUserCart(user, newCart)
        dispatch({
            type: SET_CART,
            payload: newCart,
        })
    } catch {
        console.log('failed to set new cart')
    }
}

export default setCart
