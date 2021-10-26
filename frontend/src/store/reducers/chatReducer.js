const INITIAL_STATE = {
    currChatMsgs: null,
    // [{
    //     text: '',
    //     id: null,
    //     sentAt: null,
    //     uid: null,
    //     name: '',
    //     isEdit: false,
    //     star: null,
    //     likes: null
    // }]
    quota: null,
    roomFull: false
}
export const chatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_MSGS':
            return {
                ...state,
                currChatMsgs: action.msgs
            }
        case 'ADD_MSG':
            //this doesnt do anything really, right?
            return {
                ...state,
                currChatMsgs: [...state.currChatMsgs]
            }
        case 'STAR_MSG':
        case 'UN_STAR_MSG':
            return {
                ...state,
                currChatMsgs: state.currChatMsgs.map((msg, idx) => {
                    return idx === action.idx ?
                        action.msg
                        :
                        msg
                })
            }
        // case 'UN_STAR_MSG':
        //     return {
        //         ...state,
        //         currChatMsgs: state.currChatMsgs.filter((msg, idx) => { return idx !== action.idx })
        //     }
        case 'LIKE_MSG':
        case 'UN_LIKE_MSG':
            return {
                ...state,
                currChatMsgs: state.currChatMsgs.map((msg, idx) => {
                    return idx === action.idx ?
                        action.msg
                        :
                        msg
                })

            }
        // case 'UN_LIKE_MSG':
        //     console.log('like action:', state.currChatMsgs[action.idx]);
        //     return {
        //         ...state,
        //         currChatMsgs: state.currChatMsgs.filter((msg, idx) => { return idx !== action.idx })

        //     }
        default:
            return state
    }
}