const INITIAL_STATE = {
    currChatMsgs: null,
    quota: null,
    roomFull: false
}

export const chatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_MSGS':
            return {
                ...state,
                currChatMsgs: action.msgs
            }
        case 'ADD_MSG':
            return {
                ...state,
                currChatMsgs: [...state.currChatMsgs, action.newMsg]
            }
        default:
            return state
    }
}