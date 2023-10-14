import React, { useState } from 'react'
import imgNeko from "./assets/neko.png";


const Neko = () => {

  const [light, setLight] =useState(false)

  const cn = light ? "neko": "neko dark"
  const clickButton = ()=>{
    setLight(!light)
  }

  return (
  <div className={cn}>
    <img src={imgNeko} alt=''/>
    <button onClick={()=> clickButton()}>電気</button>
  </div>

  );
};



export default Neko;