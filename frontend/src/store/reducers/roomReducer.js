const INITIAL_STATE = {
    rooms: [],
    filteredRooms: [],
    currRoom: null,
    filterBy: { topic: '', description: '', tags: [], name: '' },

}

export const roomReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_ROOMS':
            return {
                ...state,
                rooms: action.data.rooms,
                filteredRooms: action.data.filteredRooms
            }
        case 'GET_ROOM':
            return {
                ...state,
                currRoom: action.room
            }
        case 'SET_CURR_ROOM':
            return {
                ...state,
                currRoom: action.room
            }
        default:
            return state
    }
}