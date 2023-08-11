import { SET_USER_INFO } from "../constants/userInfoConstants";

const userLocalInfo = JSON.parse(localStorage.getItem('user')) ?? [];

function userInfo(state = userLocalInfo, action) {
    switch (action.type) {
        case SET_USER_INFO: {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default userInfo