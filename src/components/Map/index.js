import React, {useState} from "react";
import styled from 'styled-components'
import {GoogleMap, DirectionsRenderer} from "@react-google-maps/api";

//styled components
const Timestamp = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 10px;
  background-color: rgba(255,255,255,0.6);
  padding: 10px;
  
  span {
    font-weight: bold;
    padding-bottom: 10px;
    text-align: left;
    font-size: 12px;
  }
`


const Map = ({coords}) => {
    //gMaps requirement
    const google = window.google;


    const defaultLocation = {lat: coords[0].startLat, lng: coords[0].startLon};
    let destination = {lat: coords[1].endLat, lng: coords[1].endLon};
    let origin = {lat: coords[0].startLat, lng: coords[0].startLon};
    let directionsService;

    //directions state
    const [directions, setDirections] = useState(null)

    const onMapLoad = map => {
        directionsService = new google.maps.DirectionsService();
        //load default origin and destination
        changeDirection(origin, destination);
    };

    //function that is calling the directions service
    const changeDirection = (origin, destination) => {
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    //changing the state of directions to the result of direction service
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };


    return (
        <div>
            <GoogleMap
                center={defaultLocation}
                zoom={5}
                onLoad={map => onMapLoad(map)}
                mapContainerStyle={{height: "400px", width: "400px", position: "relative"}}
            >
                {directions !== null && (
                    <DirectionsRenderer directions={directions}/>
                )}
                <Timestamp>
                    <span>Start: {coords[0].start}</span>
                    <span>End: {coords[1].end}</span>
                </Timestamp>
            </GoogleMap>
        </div>
    );

}

export default Map;
