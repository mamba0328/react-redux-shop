import { SET_HISTORY } from "../constants/historyConstant";

const historyLocale = JSON.parse(localStorage.getItem('history')) || [];


function history(state = historyLocale, action) {
    switch (action.type) {
        case SET_HISTORY: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default history