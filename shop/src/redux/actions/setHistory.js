import { SET_HISTORY } from "../constants/historyConstant";
import {
    getDatabase, update, ref
} from "firebase/database";

function writeUserHistory(user, history) {
    if (!user) return
    const db = getDatabase();
    return update(ref(db, 'users/' + user.uid), {
        history,
    }).catch((error) => console.log(error))
}

export const setHistory = (user, history) => async (dispatch) => {
    try {
        const newHistory = await history;
        await writeUserHistory(user, newHistory);
        dispatch({
            type: SET_HISTORY,
            payload: newHistory,
        })
    }
    catch {
        console.log('failed to set favorites')
    }
}


