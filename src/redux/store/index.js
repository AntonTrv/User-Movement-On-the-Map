// import {applyMiddleware, createStore, compose} from "redux";
import {applyMiddleware, createStore} from "redux";

import thunk from 'redux-thunk';

import {rootReducer} from "./reducer";



// export const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export const store = createStore(rootReducer,applyMiddleware(thunk));


export default store