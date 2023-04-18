import { SET_CART } from "../constants/productsConstants"

const cartState = JSON.parse(localStorage.getItem('cart')) || [];

function cart(state = cartState, action) {
    switch (action.type) {
        case SET_CART: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default cart