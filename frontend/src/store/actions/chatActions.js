import { httpService } from '../../services/httpService.js';
import { getLoggedinUser } from './userActions.js';
// import { socketService } from '../../services/socketService.js';

export const addMsg = (roomId, msg, uid, name) => {
    //maybe add away to edit msg.
    //that means giving the msg an id!
    return async dispatch => {
        try {
            const currUser = await getLoggedinUser()
            console.log(currUser);
            if (currUser._id === uid) {
                const room = await httpService.post(`room/chat/${roomId}`, { msg, uid, name })
                const newMsg = room.msgs[room.msgs.length - 1]
                dispatch({ type: 'ADD_MSG', newMsg })
            }
            else {
                console.log('shouldnt happen. means the sender is not the logged in user(or guest)');
            }
        } catch (err) {
            console.log('addMsg error:', err);
        }
    }
}
export const getMsgs = (roomId) => {
    return async dispatch => {
        // const room = await httpService.get(`room/${roomId}`)
        const msgs = roomId ? await httpService.get(`room/chat/${roomId}`) : []
        // console.log('msgs:', room.msgs);
        dispatch({ type: 'SET_MSGS', msgs })

    }
}
