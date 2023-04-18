import { PEND, UNPEND } from '../constants/productsConstants';

function pendingProduct(state = null, action) {
    switch (action.type) {
        case PEND: {
            return action.payload
        }
        case UNPEND: {
            return null
        }
        default: {
            return state
        }
    }
}

export default pendingProduct