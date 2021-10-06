import { storageService } from "./storageService"

// const USER_KEY = 'users_db'
// const gUsers = [
//     {
//         name: "Tal",
//         coins: 100,
//         moves: [
//             {
//                 toId: "d99e3u2ih329",
//                 to: "Moshiko",
//                 at: 2652712571, amount: 2
//             },
//             {
//                 toId: "e454grd88329",
//                 to: "Kofiko",
//                 at: 162862741812, amount: 4
//             },
//             {
//                 toId: "d124bdfre3u2ih329",
//                 to: "Soliko",
//                 at: 162862741132, amount: 5
//             },
//             {
//                 toId: "12962ih32hdf",
//                 to: "Afiko",
//                 at: 162827418132, amount: 20
//             },
//             {
//                 toId: "7yghvf3e4rtfg",
//                 to: "Mann",
//                 at: 162862741813, amount: 1
//             }
//         ]
//     }
// ]

const getUsers = () => {
    // let users = storageService.load(USER_KEY) || []
    // if (!users.length) {
    //     users = storageService.store(USER_KEY, gUsers)
    // }
    // return Promise.resolve(users)
}
const getUser = () => {

}

const getLoggedinUser = () => {
    // return storageService.load('loggedinUser')
}

const signup = (userName) => {
    // const newUser = _getNewUser(userName.name)
    // storageService.store('loggedinUser', newUser)
    // gUsers.push(newUser)
    // const users = storageService.store(USER_KEY, gUsers)
    // return Promise.resolve(users)
}
const login = (user) => {
    // const idx = gUsers.findIndex(u => u.name === user.name)
    // if (idx === -1) return
    // storageService.store('loggedinUser', gUsers[idx])
    // return gUsers[idx]
}
const logout = () => {
    // storageService.store('loggedinUser', null)
}
export const userService = {
    getLoggedinUser,
    signup,
    login,
    logout,
    getUsers,
    getUser
}