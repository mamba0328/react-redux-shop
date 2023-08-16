function confirmModal(state = false, action) {
    switch (action.type) {
        case 'SHOW_CONFIRM_MODAL': {
            return !state
        }
        default: {
            return state
        }
    }
}

export default confirmModal