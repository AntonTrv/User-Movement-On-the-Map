import React from 'react';
import styled from "styled-components";


//not responsive preloader
const PreloaderWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: auto;
   
  div {
  width: 50px;
  height: 50px;
  margin: 50px auto ;
  border: 5px solid #61dafb;
  border-left: 5px solid white;
  border-radius: 50%;
  transition: all 0.3s;
  animation: spin 2s linear infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
}

 img {
  max-width: 240px;
 }
 
 p {
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: 0;
  }
`

const Preloader = () => {
    return (
        <PreloaderWrapper>
            <div></div>
            <img src="https://i.imgur.com/5OhKuZp.gif" alt=""/>
            <p>Looking for the tracks...</p>
            <p>May take up to 10 seconds</p>
        </PreloaderWrapper>
    );
};

export default Preloader;
