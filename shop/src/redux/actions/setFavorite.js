import { SET_FAVORITE } from "../constants/productsConstants";

const setFavorite = (products) => async (dispatch) => {
    try {
        const newFavorites = await products;
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        dispatch({
            type: SET_FAVORITE,
            payload: newFavorites,
        })
    }
    catch {
        console.log('failed to set favorites')
    }
}

export default setFavorite
