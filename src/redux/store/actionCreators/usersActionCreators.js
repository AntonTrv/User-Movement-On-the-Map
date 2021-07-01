import axios from "axios";
import * as actionTypes from '../actionTypes/index'
import MockAdapter from 'axios-mock-adapter'
import {generateUsers} from '../../../userGenerator'

//generate random server delay
const serverDelay =(min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//initializing mock
let mock = new MockAdapter(axios, {delayResponse: serverDelay(4000, 10000)});


//get request to mock
mock.onGet("/users",).reply((config) => {

    //generate new data each fetch
    let users = generateUsers(5)

    //response with all users in case of no config id received
    if (!config.params.id && config.params.id !== 0) {
        return [200, users]
    }

    //response in case of id passed to config through fetchUsers arguments
    let result = users.filter(user => user.id === config.params.id ? user : null)
    if (result.length > 0) {
        return [200, result]
    }


    //response in case if wrong data received/sht happens
    return [404, result]
});

//fetch Users

export const fetchUsers = (id) => {

    return async (dispatch) => {
        try {
            dispatch({type: actionTypes.FETCH_USER})

            const response = await axios
                .get("/users", {params: {id: id}})
                .then(function (response) {
                    return response.data;
                });

            dispatch({type: actionTypes.FETCH_USER_SUCCESS, payload: response})

        } catch (err) {
            dispatch({
                type: actionTypes.FETCH_USER_ERROR,
                payload: err.message
            })
        }
    }
}

