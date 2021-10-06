const INITIAL_STATE = {
    tattooList: [],
    currTattoo: null,
    filterBy: { description: '', categories: [] },
    query: null,

}

export const tattooReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TATTOOS':
            // console.log(action);
            return {
                ...state,
                tattooList: action.tattoos
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: action.filterBy
            }
        case 'ADD_TATTOO':
            // console.log(action);
            return {
                ...state,
                tattooList: [...state.tattooList, action.newTat]
            }
        case 'REMOVE_TATTOO':
            // console.log(action);
            return {
                ...state,
                tattooList: state.tattooList.filter(tattoo => tattoo.id !== action.tattooId)
            }
        case 'UPDATE_TATTOO':
            console.log(action);
            return {
                ...state,
                tattooList: state.tattooList.map(tattoo => tattoo.id === action.tattoo.id ? action.tattoo : tattoo)
            }
        case 'SET_QUERY':
            // console.log(action);
            return {
                ...state,
                query: action.query
            }
        default:
            return state
    }
}