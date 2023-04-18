import { PEND, UNPEND } from '../constants/productsConstants';

export const pend = (product) => async (dispatch) => {
    const asyncTask = new Promise((resolve) => { //simulating async task
        setTimeout(() => {
            resolve(product)
        }, 100)
    })

    asyncTask.then((product) => dispatch({
        type: PEND,
        payload: product,
    }))
}

export const unpend = () => {
    return {
        type: UNPEND,
    }
}

//check either works