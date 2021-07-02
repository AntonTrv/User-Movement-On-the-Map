import initialState from '../initialState/index'
import * as actions from '../actionTypes/index'

//reducer responsible for app's fetching of data and it's processing
const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USER:
            return {...state, loading: true}
        case actions.FETCH_USER_SUCCESS:
            return {...state, loading: false, currentUsers: action.payload}
        case actions.FETCH_USER_ERROR:
            return {...state, loading: false, error: action.payload}
        case actions.REFRESH_USER:
            return {...state}
        case actions.REFRESH_USER_SUCCESS:
            return {...state, currentUsers: action.payload}
        case actions.REFRESH_USER_ERROR:
            return {...state, error: action.payload}
            case actions.SHOULD_REFRESH:
            return {...state, refresh: !state.refresh}
        default:
            return state

    }
}

export default ticketsReducer

