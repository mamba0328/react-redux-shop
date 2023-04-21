import { SET_USER_INFO } from "../constants/userInfoConstants";

export const setUserInfo = (info) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USER_INFO,
            payload: info,
        })
    }
    catch {
        console.log('failed to set user info')
    }
}


