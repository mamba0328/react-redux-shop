import { TOGGLE_LOADER } from "../constants/loaderConstant";

export const loader = (state = true, action) => {
    switch (action.type) {
        case TOGGLE_LOADER: {
            return false
        }
        default: {
            return state
        }
    }
}

