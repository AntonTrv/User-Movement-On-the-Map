import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {nanoid} from "nanoid";
import Map from "../Map";
import { LoadScript } from "@react-google-maps/api";
import {useActions} from "../../redux/store/actionCreators";

//API key import from .env file
const API_KEY = process.env.REACT_APP_API_KEY

//styled components
const TableWrapper = styled.section`
  max-width: 60%;
  margin: auto;
  background-color: whitesmoke;
  
 
  & table {
  margin: 20px 0;
  border-collapse: collapse;
  width: 100%;
  position: relative;
  }
  
  & tbody, tr {
  max-width: 100%;
  }
  
  & tbody, thead, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  
  span {
  width: 100%;
  text-overflow: ellipsis;
  font-size: 0.8vw;
  }
}

  tbody:nth-child(even) {
  background-color: #dddddd;
}
  thead tr td {
    font-weight: bold;
  }
`

const MapWrapper = styled.div`
  position: fixed;
  top: 20vh;
  left: 40%;

`

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
  cursor: pointer;
  
  span {
    font-weight: bold;
    padding: 5px 10px;
    border: 1px solid silver;
    background-color: rgba(255,255,255,0.8);
  }
`

const lib = ["places"];


const Table = ({activeUser}) => {


    const {shouldRefresh} = useActions()

    //gMap requirements
    const key = API_KEY;

    //modal visibility state for map
    const [modalVisibility, setModalVisibility] = useState(false)

    //endpoints of the current trip
    const [endpoints, setEndpoints] = useState([])

    // show/hide map + endpoints passing
    const handleClick = (coords) => {
        shouldRefresh()
        setModalVisibility(!modalVisibility)
        setEndpoints(coords)
    }


    return (
        <TableWrapper>
            <table>
                <thead>
                <tr>
                    <td>Start timestamp</td>
                    <td>Start Longitude</td>
                    <td>Start Latitude</td>
                    <td>End timestamp</td>
                    <td>End Longitude</td>
                    <td>End Latitude</td>
                    <td>Show path</td>
                </tr>

                </thead>
                {activeUser.coordinates.map(coords =>
                    <tbody key={nanoid()}>

                    <tr>
                        <td><span>{coords[0].start}</span></td>
                        <td><span>{coords[0].startLat}</span></td>
                        <td><span>{coords[0].startLon}</span></td>
                        <td><span>{coords[1].end}</span></td>
                        <td><span>{coords[1].endLat}</span></td>
                        <td><span>{coords[1].endLon}</span></td>
                        <td><button style={{cursor: "pointer", textTransform: "uppercase", color: "#5E9DEF", fontWeight: "bold"}} onClick={() => handleClick(coords)}>{modalVisibility ? 'Close' : 'Show'}</button></td>
                    </tr>
                    </tbody>
                )}

            </table>

            {modalVisibility &&
            <MapWrapper>
                <CloseBtn onClick={handleClick}><span>X</span></CloseBtn>
                <LoadScript googleMapsApiKey={key} libraries={lib}>
                <Map coords={endpoints}/>
            </LoadScript></MapWrapper>
            }
        </TableWrapper>
    );
};

export default Table;
