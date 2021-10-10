// import axios from 'axios'
import { httpService } from './httpService.js'
import { getRandomIntInclusive } from './utilService.js';
// import { storageService } from './async-storage-service.js'

// const STATION_KEY = 'room'
// const IMG_URL = 'https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg'


// const STATION_URL = 'http://127.0.0.1:3030/api/room/'

const query = async (filterBy) => {
    // let rooms = await storageService.query(STATION_KEY)
    // if (!rooms || !rooms.length) {
    //   rooms = gRooms
    //   storageService.postMany(STATION_KEY, rooms)
    // }
    // return rooms

    try {
        const data = await httpService.get(`room`, { filterBy })
        // const data = await httpService.get(`room`, { params: filterBy })
        return data
    } catch (err) {
        console.log('Error on room service =>', err)
    }
}

const getById = async (roomId) => {
    // const room = await storageService.get(STATION_KEY, roomId)
    // return room
    try {
        const room = await httpService.get(`room/${roomId}`)
        return room
    } catch (err) {
        console.log('Error on room service =>', err)
    }
}

const remove = async (roomId) => {
    try {
        const removedRoom = await httpService.delete(`room/${roomId}`)
        return removedRoom
    } catch (err) {
        console.log('Error on room service =>', err)
        throw err;
    }
    // return storageService.remove(STATION_KEY, roomId)

}

const save = async (room) => {
    // if (room._id) {
    //     const updatedRoom = await storageService.put(STATION_KEY, room)
    //     return updatedRoom
    // }
    // if (!room.imgUrl) {
    //     room.imgUrl = IMG_URL
    // }
    // const addedRoom = await storageService.post(STATION_KEY, room)
    // return addedRoom

    // room = JSON.parse(JSON.stringify(room))
    try {
        if (!room._id) {
            const newRoom = await httpService.post(`room/`, room)
            return newRoom
        } else {
            const updatedRoom = await httpService.put(`room/`, room)
            return updatedRoom
        }
    } catch (err) {
        console.log('Error on room service =>', err)
        throw err;
    }

    // user = await httpService[method](`room/${room._id}`, room)
    // Handle case in which admin updates other room's details
    // if (getLoggedinUser()._id === room._id) _saveLocalUser(room)
    // }
}

const getEmptyRoom = () => {
    const room = {
        _id: '',
        name: '',
        imgUrl: '',
        description: '',
        tags: [],
        createdAt: Date.now(),
        // createdBy: {},
        likedByUsers: _getRandNum(),
        songs: []
    }
    return room
}

const saveSong = async (song, roomId) => {
    try {
        const room = await getById(roomId);
        const newSong = {
            id: song.id.videoId,
            title: song.snippet.title,
            imgUrl: song.snippet.thumbnails.high.url.replace('https:', ''),
            addedBy: '',
            duration: song.duration
        };
        room.songs.push(newSong);
        const updatedRoom = await save(room)
        return updatedRoom
    } catch (err) {
        console.log('Error on room service =>', err)
        throw err;
    }

}

const removeSong = async (songId, roomId) => {
    try {
        const room = await getById(roomId)
        const idx = room.songs.findIndex(song => song.id === songId)
        room.songs.splice(idx, 1)
        const updatedRoom = await save(room)
        return updatedRoom
    } catch (err) {
        console.log('Error on room service =>', err)
        throw err;
    }
}

const saveSongList = async (list, roomId) => {
    try {
        const room = await getById(roomId)
        room.songs = [...list]
        const updatedRoom = await save(room)
        return updatedRoom;
        // return updatedRoom.songs
    } catch (err) {
        console.log('Error on room service =>', err)
    }
}

const _getRandNum = () => {
    return getRandomIntInclusive(1000, 60000);
}

export const roomService = {
    query,
    getById,
    remove,
    save,
    getEmptyRoom,
    saveSong,
    removeSong,
    saveSongList
}