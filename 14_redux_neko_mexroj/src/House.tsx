import React ,{ useState }from 'react'
import imgHouse from './assets/house.png'


const House = () => {

  const [light, setLight] =useState(false)

  const cn = light ? "house": "house dark"
  const clickButton = ()=>{
    setLight(!light)
  }




  return (
  <div className={cn}>
    <img src={imgHouse}alt="" />
    <button onClick={()=>clickButton()}>電気</button>
  </div>
  );
};

export default House;