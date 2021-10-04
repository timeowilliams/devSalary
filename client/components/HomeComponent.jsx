import LoginComponent from "./LoginComponent";
import BodyImage from '../../public/assets/homePhoto.jpeg'
// import './HomeComponent.css';
import React from "react";

const HomeComponent = () => {
  return (
  <div>
   <img src={BodyImage} style={{width: 1000, height: 500 }}/>
  <LoginComponent />
  </div>
  )
}

export default HomeComponent;