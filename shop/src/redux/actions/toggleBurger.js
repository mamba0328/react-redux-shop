import { TOGGLE_BURGER, CLOSE_BURGER } from "../constants/burgerConstatns"

export const toggleBurger = () => {
    return {
        type: TOGGLE_BURGER,
    }
}

export const closeBurger = () => {
    return {
        type: CLOSE_BURGER,
    }
}