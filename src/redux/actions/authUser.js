import { AUTH_USER } from '../constants/authConstants';

export const authenticate = (userData) => async (dispatch) => {
    const user = await userData;

    return dispatch({
        type: AUTH_USER,
        payload: user,
    })
} 