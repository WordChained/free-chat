import { firebaseService } from '../../services/firebaseService'



export const loadTattoos = () => {
  return async (dispatch, getState) => {

    const { filterBy } = getState().tattooModule
    try {

      const tattoos = await firebaseService.getTattoos(filterBy)
      dispatch({ type: 'SET_TATTOOS', tattoos })
    } catch (err) {
      console.log(err);
    }
  }
}


export const updateTattoo = (tatId, desc) => {
  return async dispatch => {

    await firebaseService.updateTattoo(tatId, desc)
    const tattoo = firebaseService.getTattooById(tatId)
    dispatch({ type: 'UPDATE_TATTOO', tattoo })
  }
}
export const addTattoo = (tattoo) => {
  return async dispatch => {
    const newTat = await firebaseService.addTattoo(tattoo)
    dispatch({ type: 'ADD_TATTOO', newTat })
    // dispatch({ type: 'ADD_TATTOO_TO_USER', tatId: newTat.id })
  }
}
// export const addTattooToUser = (tatId) => {
//   return async dispatch => {
//     const newTat = await firebaseService.addTattooToUser(tatId)
//     dispatch({ type: 'ADD_TATTOO_TO_USER', newTat })
//   }
// }

export const removeTattoo = (tatId) => {
  return async dispatch => {
    await firebaseService.removeTattoo(tatId)
    dispatch({ type: 'REMOVE_TATTOO', tatId })
  }
}

export const setFilterBy = (filterBy) => {
  return dispatch => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
export const setQuery = (query) => {
  return dispatch => {
    dispatch({ type: 'SET_QUERY', query })
  }
}