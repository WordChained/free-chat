import io from 'socket.io-client'
// import { httpService } from './http-service'

// export const SOCKET_EMIT_USER_WATCH = 'user-watch';
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added';
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you';


const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://free-chat-1.herokuapp.com' : '//localhost:3030'
// "homepage": "https://free-chat-1.herokuapp.com",
export const socketService = createSocketService()
// window.socketService = socketService

// export const socketService = createDummySocketService()

// window.socketService = socketService

// var socketIsReady = false;

socketService.setup()


function createSocketService() {
    let socket = null;
    const socketService = {
        async setup() {
            socket = io(baseUrl, { withCredentials: true, });
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            console.log('emit', socket);
            socket.emit(eventName, data)
            // socket.on(eventName, data)
        },
        // broadcast() {
        //     socket.broadcast(eventName, data)
        // },
        terminate() {
            socket = null
        }
    }
    return socketService
}

// eslint-disable-next-line
// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       2
//       this.setup()
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     debugMsg() {
//       this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
//     },
//   }
//   return socketService
// }


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)