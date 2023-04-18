import { SET_FAVORITE } from "../constants/productsConstants";
import {
    getDatabase, update, ref
} from "firebase/database";


function writeUserFavorite(user, favorite) {
    if (!user) return
    const db = getDatabase();
    return update(ref(db, 'users/' + user.uid), {
        favorite,
    }).catch((error) => console.log(error))
}

const setFavorite = (user, products) => async (dispatch) => {
    try {
        const newFavorites = await products;
        await writeUserFavorite(user, newFavorites);
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
