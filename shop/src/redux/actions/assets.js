import { ASSET_LOADED } from "../constants/assetsConstants"

const addAsset = () => {
    return {
        type: ASSET_LOADED,
    }
}

export default addAsset