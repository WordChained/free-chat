const INITIAL_STATE = {
    rooms: null,
    filteredRooms: null,
    currRoom: null,
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
        default:
            return state
    }
}