import { SET_PRODUCTS } from '../constants/productsConstants'

function products(state = [], action) {
    switch (action.type) {
        case SET_PRODUCTS: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default products