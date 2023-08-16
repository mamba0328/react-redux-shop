import { AUTH_USER } from "../constants/authConstants"

const loggedInUser = JSON.parse(localStorage.getItem('user')) || false;

function user(state = loggedInUser, action) {
    switch (action.type) {
        case AUTH_USER: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default user