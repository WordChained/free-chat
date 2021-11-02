const INITIAL_STATE = {
  users: null,
  loggedInUser: null,
  guestUser: null,
  //
  wrongCreds: null,
  isRegisteredUser: false,
  ready: false
}

//loggedInUser:{
//userName: String,
//fullName: String,
//birthday: string,
//password: String,
//imgUrl: String,
//likedRooms: Array of strings
//isGuest: boolean,
// }

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_READY':
      // console.log('action.user:', action.user);
      return {
        ...state,
        ready: action.isReady
      }
    case 'LOGIN':
      // console.log('action.user:', action.user);
      return {
        ...state,
        loggedInUser: action.user,
        guestUser: null
      }
    case 'LOGIN_GUEST':
      // console.log('action.user:', action.user);
      return {
        ...state,
        guestUser: action.user,
        loggedInUser: null
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
        guestUser: null
      }
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return {
        ...state,
        wrongCreds: action.isWrong
      }
    case 'SET_REGISTERED_USER':
      return {
        ...state,
        isUser: action.isUser
      }
    case 'GET_USERS':
      return {
        ...state,
        users: action.users
      }
    case 'SET_USER_IMAGE':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          userImg: action.img
        }
      }
    case 'SET_USER_BIO':
      return {
        ...state,
        bio: action.bio
      }
    case 'UPDATE_USER':
      return {
        ...state,
        loggedInUser: action.user
      }
    case 'GET_USER':
      return {
        ...state,
        loggedInUser: action.user
      }

    default:
      return state
  }
}