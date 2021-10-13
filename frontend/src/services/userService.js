import { storageService } from './async-storage-service'
import { httpService } from './httpService'
import { socketService } from './socketService'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null;

export const userService = {
    saveUserId,
    getUserId,
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    likedRoom
}

//For chat sender ids
function saveUserId(userId) {
    sessionStorage.setItem('userId', JSON.stringify(userId))
}

function getUserId() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        return JSON.parse(userId);
    }
    return null;
}

// window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // gWatchedUser = user;
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    console.log(user);
    user = await httpService.put(`user/${user._id}`, user)
    console.log(user);
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.clear()
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}
// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     // var user = getLoggedinUser()
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (coming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
(async () => {
    //TODO: How does this work?

    const user = getLoggedinUser()
    if (user) socketService.emit('set-user-socket', user._id)
})();

async function likedRoom(song) {
    const user = getLoggedinUser()
    try {
        await httpService.put(`/user/song/${user._id}`, song)
    } catch (err) {
        console.log('Error on user service => likedSong')
        throw err
    }
}