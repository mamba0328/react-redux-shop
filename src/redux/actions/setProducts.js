import { SET_PRODUCTS } from '../constants/productsConstants'
import { getProducts } from '../../api/getProducts';

const setProducts = () => async (dispatch) => {
    try {
        const products = await getProducts();
        dispatch({
            type: SET_PRODUCTS,
            payload: products,
        });
    } catch {
        dispatch({
            type: SET_PRODUCTS,
            payload: [],
        });
    }
}

export default setProducts