import { httpService } from '../../services/httpService.js';

export const addMsg = (roomId, msg, uid, name) => {
    //maybe add away to edit msg.
    //that means giving the msg an id!
    return async dispatch => {
        const room = await httpService.post(`room/chat/${roomId}`, { msg, uid, name })
        const newMsg = room.msgs[room.msgs.length - 1]
        console.log('newMsg:', newMsg);
        dispatch({ type: 'ADD_MSG', newMsg })
    }
}
export const getMsgs = (roomId) => {
    return async dispatch => {
        // const room = await httpService.get(`room/${roomId}`)
        const msgs = await httpService.get(`room/chat/${roomId}`)
        // const msgs = room.msgs
        // console.log('msgs:', room.msgs);
        dispatch({ type: 'GET_MSGS', msgs })
    }
}
