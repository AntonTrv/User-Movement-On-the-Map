import './App.css';
import React, {useEffect, useState} from "react";
import {useActions} from "./redux/store/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import Table from "./components/Table";
import Preloader from "./components/Preloader";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import ActionCreators from './redux/store/actionCreators/index'


const SelectWrapper = styled.div`
  //possible styles
`

//materialUI styles for select input
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300
    }
}));

function App() {
    //materialUI
    const classes = useStyles();

    //constant data about all users for rendering
    const [allUsers, setAllUsers] = useState([])

    //store values
    const {currentUsers, loading, error, refresh} = useSelector(state => state.users)

    //current user data for rendering
    const [selectValue, setSelectValue] = useState(0)

    //actions
    // const {fetchUsers} = useActions()

    // explicit declaration for dependency bypass
    const dispatch = useDispatch()


    //fetches data when mounting is over. Fetches all users for rendering
    useEffect(() => {
        dispatch(ActionCreators.fetchUsers())
    },[dispatch])

    //refresh data each time select input changes
    useEffect(() => {
        dispatch(ActionCreators.fetchUsers(selectValue))
    },[selectValue, dispatch])



    //updates allUsers state each time data is fetched from axios
    useEffect(() => {
        setAllUsers(prevState => {
            let updatedUser

            //form new user data for state merge
            if(prevState.length > 0){
                updatedUser = allUsers.map(user => user.id === currentUsers[0].id ? {
                    id: user.id,
                    name: user.name,
                    coordinates: [...prevState[currentUsers[0].id].coordinates, ...currentUsers[0].coordinates],
                    start: user.start,
                    end: user.end
                } : user )

                //return last 100 values if exceeds limit length of 100
                if(updatedUser[0].coordinates.length > 100){
                    updatedUser[0].coordinates = updatedUser[0].coordinates.slice(-100)
                    return[...updatedUser]
                }
                //return updated state with new values of user
                return[...updatedUser]
            }
            //default return of state for mount update
            return[...prevState,...currentUsers]
        })
    }, [currentUsers]) // eslint-disable-line



    useEffect(() => {
        let interval
        if(refresh) {
            const MINUTE_MS = 4000;// update frequency

             interval = setInterval(() => {
                dispatch(ActionCreators.refreshUsers())
            }, MINUTE_MS);
        }

        return () => clearInterval(interval);
         // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [dispatch, refresh])



//fetch currentUsers (single/multiple)
    const handleChange = (e) => {
        setSelectValue(+e.target.value)
    }

    //fallback in case of error
    if(error) {
        return (
            <>
                <h2>Something went wrong</h2>
                <p>Please refresh the page</p>
            </>
        )

    }

    return (

        //did't make this select input a standalone component to speed up development process
        <div className="App">
            {
                <>
                    <SelectWrapper>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Choose a user</InputLabel>
                            <Select
                                id="users"
                                value={selectValue}
                                onChange={handleChange}
                            >
                                {allUsers.map(user =>
                                    <MenuItem key={nanoid()} value={user.id} selected={user.id === selectValue}>{user.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </SelectWrapper>

                    {loading && <Preloader/>}
                    {(allUsers.length) && <Table activeUser={allUsers[selectValue]}/>}

                </>
            }
        </div>
    );
}

export default App;