import { SET_FAVORITE } from "../constants/productsConstants";

function favorite(state = [], action) {
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