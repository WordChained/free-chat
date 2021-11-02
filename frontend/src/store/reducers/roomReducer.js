const INITIAL_STATE = {
    rooms: null,
    filteredRooms: null,
    currRoom: null,
    currPrivateRoom: null,
    filterBy: { topic: '', description: '', tags: [], name: '' },

}

export const roomReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_ROOMS':
            return {
                ...state,
                rooms: action.data.rooms,
                filteredRooms: action.data.filteredRooms,
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
        case 'SET_CURR_PRIVATE_ROOM':
            return {
                ...state,
                currPrivateRoom: action.room
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    topic: action.filterBy,
                    description: action.filterBy,
                    name: action.filterBy
                }
            }
        case 'SET_TAGS':
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    tags: action.tags
                }
            }
        case 'ADD_ROOM':
            return {
                ...state,
                rooms: [...state.rooms, action.newRoom]
            }
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room => room._id === action.newRoom._id ? action.newRoom : room)
            }
        case 'REMOVE_ROOM':
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== action.roomId)
            }
        default:
            return state
    }
}