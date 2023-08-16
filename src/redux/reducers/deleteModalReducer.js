function deleteModal(state = false, action) {
    switch (action.type) {
        case "SHOW_DELETE_MODAL": {
            return !state
        }
        default: {
            return state
        }
    }
}

export default deleteModal