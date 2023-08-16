import { TOGGLE_BURGER, CLOSE_BURGER } from "../constants/burgerConstatns"

function burgerMenu(state = false, action) {
    switch (action.type) {
        case TOGGLE_BURGER: {
            return !state
        }
        case CLOSE_BURGER: {
            return false
        }
        default: {
            return state
        }
    }
}

export default burgerMenu