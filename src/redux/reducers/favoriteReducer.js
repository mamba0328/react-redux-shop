import { SET_FAVORITE } from "../constants/productsConstants";

const favoritesLocale = JSON.parse(localStorage.getItem('favorites')) || [];

function favorite(state = favoritesLocale, action) {
    switch (action.type) {
        case SET_FAVORITE: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default favorite