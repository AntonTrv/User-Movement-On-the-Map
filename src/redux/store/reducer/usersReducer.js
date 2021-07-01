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
        default:
            return state

    }
}

export default ticketsReducer

