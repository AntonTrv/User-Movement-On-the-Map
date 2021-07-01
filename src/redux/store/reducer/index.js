import usersReducer from './usersReducer'
import {combineReducers} from "redux";


//combine reducers into a  single object
export const rootReducer = combineReducers({
    users: usersReducer
})