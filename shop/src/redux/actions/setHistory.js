import { SET_HISTORY } from "../constants/historyConstant";

export const setHistory = (history) => async (dispatch) => {
    try {
        const newHistory = await history;
        dispatch({
            type: SET_HISTORY,
            payload: newHistory,
        })
    }
    catch {
        console.log('failed to set history')
    }
}


