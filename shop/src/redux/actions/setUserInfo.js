import { SET_USER_INFO } from "../constants/userInfoConstants";

export const setUserInfo = (info) => async (dispatch) => {
    try {
        localStorage.setItem('user', JSON.stringify(info))

        dispatch({
            type: SET_USER_INFO,
            payload: info,
        })
    }
    catch {
        console.log('failed to set user info')
    }
}


