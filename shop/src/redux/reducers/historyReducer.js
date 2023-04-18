import { SET_HISTORY } from "../constants/historyConstant";

function history(state = [], action) {
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