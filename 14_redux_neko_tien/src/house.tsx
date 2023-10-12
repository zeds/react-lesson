import React, { useState } from "react";
import imgHouse from "./assets/house.png";
import { useDispatch, useSelector } from "react-redux";
import { lightChange } from "./redux/slices/lightSlice";

function House() {
    const dispatch = useDispatch();
//   const [toggle, setToggle] = useState(false);

  //read state
  const lightSwitch = useSelector((store : any) => store.light);

  const clickButton = () => {
    dispatch(lightChange(!lightSwitch));
    const box = document.querySelector(".house") as HTMLDivElement | null;
    if (lightSwitch) {
      box.style.background = "red";
    } else {
      box.style.background = "black";
    }
  };

  return (
    <div className="house" style={{}}>
      House
      <div></div>
      <img src={imgHouse} alt=""></img>
      <button onClick={() => clickButton()}>電気</button>
    </div>
  );
}

export default House;
