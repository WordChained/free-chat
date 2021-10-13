

// export const setCurrUser = () => {
//   return async dispatch => {
//     if (!user) {
//       dispatch({ type: 'READY', readyState: true })
//     } else {
//       dispatch({ type: 'LOGIN', user })
//       dispatch({ type: 'READY', readyState: true })
//     }

//   }
// }
// export const login = (email, password) => {
//   return async dispatch => {
//     try {
//       if (loginAttempt === null) dispatch({ type: 'SET_WRONG_PASSWORD', isWrong: true })
//       else if (loginAttempt === 'wrong email') {
//         console.log('loginAttempt:', loginAttempt);
//         dispatch({ type: 'SET_WRONG_EMAIL', isWrong: true })
//       }
//       else if (typeof loginAttempt === 'object') {
//         console.log('firebase service (login) user: ', user);
//         dispatch({ type: 'LOGIN', user })
//         dispatch({ type: 'SET_WRONG_EMAIL', isWrong: false })
//         dispatch({ type: 'SET_WRONG_PASSWORD', isWrong: false })
//       } else {
//         console.log('final else. user:', loginAttempt);
//       }

//     } catch (err) {
//       console.log('error in login (userACtions):', err);
//     }
//   }
// }


// export const signup = (user) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: 'SET_REGISTERED_USER', isUser: true })

//         } catch (err) {
//             console.log('signup err:', err);
//         }
//     }
// }

// export const logout = () => {
//   return async dispatch => {
//     try {
//       console.log('logoout?');
//       dispatch({ type: 'LOGOUT' })
//     } catch (err) {
//       console.log('logout err in Atcion:', err);
//     }
//   }
// }

// export const addTattooToUser = (tatId, uid) => {
//   return async dispatch => {
//     dispatch({ type: 'ADD_TATTOO_TO_USER', tatId })
//   }
// }
// export const removeTattooFromUser = (tatId, uid) => {
//   return async dispatch => {
//     dispatch({ type: 'REMOVE_TATTOO_FROM_USER', tatId })
//   }
// }
// export const setUserProfileImage = (img, uid) => {
//   return async dispatch => {
//     dispatch({ type: 'SET_USER_IMAGE', img })
//   }
// }
// export const setUserBio = (bio, uid) => {
//   return async dispatch => {
//     dispatch({ type: 'SET_USER_BIO', bio })
//   }
// }