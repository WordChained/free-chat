import { httpService } from '../../services/httpService.js';
// import { socketService } from '../../services/socketService.js';
import { getRandomIntInclusive } from '../../services/utilService.js';


export const query = (filterBy) => {
    return async dispatch => {
        const data = await httpService.get(`room`, { filterBy })
        dispatch({ type: 'GET_ROOMS', data })
    }

}

export const setCurrRoom = (room) => {
    return dispatch => {
        // socketService.emit('room updated', room)
        dispatch({ type: 'SET_CURR_ROOM', room })
    }
}
export const setCurrPrivateRoom = (room) => {
    return dispatch => {
        // socketService.emit('room updated', room)
        dispatch({ type: 'SET_CURR_PRIVATE_ROOM', room })
    }
}
export const setCurrRoomById = (roomId) => {
    return async dispatch => {
        const room = await httpService.get(`room/${roomId}`)
        // socketService.emit('room updated', room)
        dispatch({ type: 'SET_CURR_ROOM', room })
    }
}

export const getRoomById = (roomId) => {
    return async dispatch => {
        try {

            const room = await httpService.get(`room/${roomId}`)
            dispatch({ type: 'GET_ROOM', room })
        } catch (err) {
            console.log('getRoomById error:', err);
        }
    }
}

export const setFilterBy = (filterBy) => {
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

export const setTags = (tags) => {
    return dispatch => {
        dispatch({ type: 'SET_TAGS', tags })
    }
}

export const remove = (roomId) => {
    return async dispatch => {
        try {
            await httpService.delete(`room/${roomId}`)
            dispatch({ type: 'REMOVE_ROOM', roomId })
        } catch (err) {
            console.log('Error on room service =>', err)
            throw err;
        }
    }

}
//add and update
export const save = (room) => {
    //both the try and the catch are working here for some reason
    if (!room._id) {
        //add
        console.log('add!');
        return async dispatch => {
            try {
                const newRoom = await httpService.post(`room/`, room)
                dispatch({ type: 'ADD_ROOM', newRoom })
            } catch (err) {
                console.log('save (add) error:', err);
            }
        }
    }
    else {
        //update
        return async dispatch => {
            try {
                const updatedRoom = await httpService.put(`room/`, room)
                console.log('updatedRoom', updatedRoom);
                dispatch({ type: 'UPDATE_ROOM', updatedRoom })
            } catch (err) {
                console.log('save (update) error:', err);
            }
        }
    }
}

export const getEmptyRoom = () => {
    const room = {
        _id: '',
        name: '',
        imgUrl: '',
        description: '',
        tags: [],
        createdAt: Date.now(),
        // createdBy: {},
        likedByUsers: getRandomIntInclusive(1000, 60000),
        songs: []
    }
    return room
}

// export const saveSong = async (song, roomId) => {
//     try {
//         const room = await getById(roomId);
//         const newSong = {
//             id: song.id.videoId,
//             title: song.snippet.title,
//             imgUrl: song.snippet.thumbnails.high.url.replace('https:', ''),
//             addedBy: '',
//             duration: song.duration
//         };
//         room.songs.push(newSong);
//         const updatedRoom = await save(room)
//         return updatedRoom
//     } catch (err) {
//         console.log('Error on room service =>', err)
//         throw err;
//     }

// }

// export const removeSong = async (songId, roomId) => {
//     try {
//         const room = await getById(roomId)
//         const idx = room.songs.findIndex(song => song.id === songId)
//         room.songs.splice(idx, 1)
//         const updatedRoom = await save(room)
//         return updatedRoom
//     } catch (err) {
//         console.log('Error on room service =>', err)
//         throw err;
//     }
// }

// export const saveSongList = async (list, roomId) => {
//     try {
//         const room = await getById(roomId)
//         room.songs = [...list]
//         const updatedRoom = await save(room)
//         return updatedRoom;
//         // return updatedRoom.songs
//     } catch (err) {
//         console.log('Error on room service =>', err)
//     }
// }
