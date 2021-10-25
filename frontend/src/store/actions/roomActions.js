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
export const setCurrRoomById = (roomId) => {
    return async dispatch => {
        const room = await httpService.get(`room/${roomId}`)
        // socketService.emit('room updated', room)
        dispatch({ type: 'SET_CURR_ROOM', room })
    }
}

export const getById = (roomId) => {
    return async dispatch => {
        const room = await httpService.get(`room/${roomId}`)
        dispatch({ type: 'GET_ROOM', room })
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

export const remove = async (roomId) => {
    try {
        const removedRoom = await httpService.delete(`room/${roomId}`)
        return removedRoom
    } catch (err) {
        console.log('Error on room service =>', err)
        throw err;
    }

}
//add and update
export const save = (room) => {
    if (!room._id) {
        return async dispatch => {
            const newRoom = await httpService.post(`room/`, room)
            // socketService.emit('room updated', newRoom)
            dispatch({ type: 'ADD_ROOM', newRoom })
        }
    }
    else {
        return async dispatch => {
            const updatedRoom = await httpService.put(`room/`, room)
            dispatch({ type: 'UPDATE_ROOM', updatedRoom })
        }
    }
    // try {
    //     if (!room._id) {
    //         const newRoom = await httpService.post(`room/`, room)
    //         return newRoom
    //     } else {
    //         const updatedRoom = await httpService.put(`room/`, room)
    //         return updatedRoom
    //     }
    // } catch (err) {
    //     console.log('Error on room service =>', err)
    //     throw err;
    // }
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
