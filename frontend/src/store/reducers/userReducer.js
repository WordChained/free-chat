const INITIAL_STATE = {
  loggedInUser: null,
  //if guest, need to give loggedInUser stats anyway
  //add a boolean called: 'guest'!!!!
  wrongPassword: null,
  wrongEmail: null,
  isUser: false,
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
        loggedInUser: action.user
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null
      }
    // case 'SIGNUP':
    //   return {
    //     ...state,
    //     loggedInUser: action.user
    //   }
    case 'SET_WRONG_PASSWORD':
      return {
        ...state,
        wrongPassword: action.isWrong
      }
    case 'SET_WRONG_EMAIL':
      return {
        ...state,
        wrongEmail: action.isWrong
      }
    case 'SET_REGISTERED_USER':
      return {
        ...state,
        isUser: action.isUser
      }
    case 'ADD_TATTOO_TO_USER':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          tattoos: [...state.loggedInUser.tattoos, action.tatId]
        }
      }
    case 'REMOVE_TATTOO_FROM_USER':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          tattoos: state.loggedInUser.tattoos.map(tat => tat.id !== action.tatId ? action.tatId : tat)
        }
      }
    case 'SET_USER_IMAGE':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          userImg: action.img
        }
      }
    case 'READY':
      // console.log('im ready to load!');
      return {
        ...state,
        ready: action.readyState
      }
    case 'SET_USER_BIO':
      return {
        ...state,
        bio: action.bio
      }

    default:
      return state
  }
}