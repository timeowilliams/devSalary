import LoginComponent from "./LoginComponent";
import BodyImage from '../../public/assets/homePhoto.jpeg'
 import './HomeComponent.css';
import React from "react";

const HomeComponent = () => {
  return (
  <div style={{
    position: 'relative',
  }}>
   <img src={BodyImage} style={{width: `100%`, height: `50%` }}/>
  <LoginComponent style={{
    position: 'absolute',
    bottom: '8px',
    left: '16px'
  }} />
  </div>
  )
}

export default HomeComponent;