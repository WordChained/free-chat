import { storageService } from '../../services/async-storage.service'
import { httpService } from '../../services/httpService'
import { socketService } from '../../services/socketService'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
// var gWatchedUser = null;



//For chat sender ids. these dont belong in userActions!
// export const saveUserId = (userId) => {
//     sessionStorage.setItem('userId', JSON.stringify(userId))
// }

// export const getUserId = () => {
//     const userId = sessionStorage.getItem('userId');
//     if (userId) {
//         return JSON.parse(userId);
//     }
//     return null;
// }

// window.userService = userService

export const getUsers = () => {
    return httpService.get(`user`)
}

export const getById = (userId) => {
    return async dispatch => {
        const user = await httpService.get('user', userId)
        // gWatchedUser = user;
        dispatch({ type: 'GET_USER', user })
    }
}

export const remove = (userId) => {
    return storageService.remove('user', userId)
}

export const update = (user) => {
    return async dispatch => {
        try {
            console.log('user to update:', user);
            user = await httpService.put(`user/${user._id}`, user)
            console.log(user);
            // Handle case in which admin updates other user's details
            if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
            dispatch({ type: 'UPDATE_USER', user })
        } catch (err) {
            console.log('eeror in update:', err);
        }
    }
}

export const login = (userCred) => {
    return async dispatch => {
        try {
            const user = await httpService.post('auth/login', userCred)
            if (user) _saveLocalUser(user)
            dispatch({ type: 'LOGIN', user })

        } catch (err) {
            console.log('login error:', err);
            dispatch({ type: 'LOGIN_ERROR', isWrong: true })
        }
    }
}

export const signup = (userCred) => {
    const newUserCred = { ...userCred, imgUrl: '', likedRooms: [] }
    return async dispatch => {
        try {
            const user = await httpService.post('auth/signup', newUserCred)
            _saveLocalUser(user)
            dispatch({ type: 'SIGNUP', user })
        } catch (err) {
            console.log('signup error:', err);
            dispatch({ type: 'LOGIN_ERROR', isWrong: true })
        }
    }
}

export const logout = () => {
    sessionStorage.clear()
    return dispatch => {
        dispatch({ type: 'LOGOUT' })
    }
}

const _saveLocalUser = (user) => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}

export const getLoggedinUser = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || 'null')
}

export const persistLogin = (user) => {
    return async dispatch => {
        try {
            const userId = await httpService.get('user', user._Id)
            if (userId) {
                dispatch({ type: 'LOGIN', user })
            }
        } catch (err) {
            console.log('persistLogin error:', err);
            console.log('user does not exist (persistLogin)');
        }
    }
}
export const setReady = (isReady) => {
    return dispatch => {
        dispatch({ type: 'SET_READY', isReady })
    }
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

// export const likedRoom = (song) => {
//     const user = getLoggedinUser()
//     try {
//         await httpService.put(`/user/song/${user._id}`, song)
//     } catch (err) {
//         console.log('Error on user service => likedSong')
//         throw err
//     }
// }