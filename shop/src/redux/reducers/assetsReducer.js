import { ASSET_LOADED } from "../constants/assetsConstants";

const assets = (state = 0, action) => {
    switch (action.type) {
        case ASSET_LOADED: {
            return state + 1
        }
        default: {
            return state
        }
    }
}

export default assets