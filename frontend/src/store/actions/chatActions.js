import { httpService } from '../../services/httpService.js';
import { getLoggedinUser } from './userActions.js';
export const addMsg = (roomId, msg, uid, name, isEdit, star, likes) => {
    //maybe add away to edit msg.
    return async dispatch => {
        try {
            const currUser = await getLoggedinUser()
            console.log(currUser);
            if (currUser._id === uid) {
                const room = await httpService.post(`room/chat/${roomId}`, { msg, uid, name, isEdit, star, likes })
                // const newMsg = room.msgs[room.msgs.length - 1]
                // if (room.msgs.find(m => m.id === msg.id)) {
                //     console.log('theres a double');
                //     return
                // }
                dispatch({ type: 'ADD_MSG', msgs: room.msgs })

            }
            else {
                console.log('shouldnt happen. means the sender is not the logged in user/guest');
            }
        } catch (err) {
            console.log('addMsg error:', err);
        }
    }
}

export const starMsg = (roomId, uid, msgId, currRoom) => {
    return async dispatch => {
        try {
            // const msgIdx = currRoom.msgs.findIndex(msg => msg.id === msgId)
            const room = await httpService.post(`room/chat/${roomId}/star/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            // if (msg.likes.includes(uid)) {
            //     console.log('likes already includes uid', uid + '. msg:', msg);
            //     return
            // }
            // msg.star.push(uid)
            dispatch({ type: 'STAR_MSG', msg, idx })

        } catch (err) {
            console.log('starMsg error:', err);
        }
    }
}
export const unStarMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {

            const room = await httpService.delete(`room/chat/${roomId}/star/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            msg.star.filter(u => u !== uid)
            dispatch({ type: 'UN_STAR_MSG', msg, idx })
        } catch (err) {
            console.log('unStarMsg error:', err);
        }

    }
}
export const likeMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {
            // const currUser = await getLoggedinUser()
            // if (currUser._id === uid) {
            const room = await httpService.post(`room/chat/${roomId}/likes/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            // if (msg.likes.includes(uid)) {
            //     console.log('likes already includes uid', uid + '. msg:', msg);
            //     return
            // }
            // msg.likes.push(uid)
            // dispatch({ type: 'STAR_MSG', uid,idx })
            dispatch({ type: 'LIKE_MSG', msg, idx })
            // }
        } catch (err) {
            console.log('likeMsg error:', err);
        }
    }
}

export const unLikeMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {
            const room = await httpService.delete(`room/chat/${roomId}/likes/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            msg.likes.filter(u => u !== uid)
            dispatch({ type: 'UN_LIKE_MSG', msg, idx })
        } catch (err) {
            console.log('unLikeMsg error:', err);
        }

    }
}
export const getMsgs = (roomId) => {
    return async dispatch => {
        try {
            // const room = await httpService.get(`room/${roomId}`)
            const msgs = roomId ? await httpService.get(`room/chat/${roomId}`) : []
            // console.log('msgs:', room.msgs);
            dispatch({ type: 'SET_MSGS', msgs })
        } catch (err) {
            console.log('getMsgs error:', err);
        }

    }
}
