import React, { useState } from "react";
import imgHouse from "./assets/house.png";
import { useDispatch, useSelector } from "react-redux";
import { lightChange } from "./redux/slices/lightSlice";
import { locationChange } from "./redux/slices/locationSlice";

function House() {
  const dispatch = useDispatch();
  //read state
  const lightSwitch = useSelector((store: any) => store.light.lightOn);
  const box = document.querySelector(".house") as HTMLDivElement | null;
  if (box) {
    if (lightSwitch) {
      box.style.background = "white";
    } else {
      box.style.background = "black";
    }
  }
  //neko
  const location = useSelector((store: any) => store.location.location);
  const nn = location == "inSide" ? true : false; 
  console.log(location);

  const clickButton = () => {
    dispatch(lightChange(!lightSwitch));
  };
  const ClickHouse = () => {
    if (location === "inSide") {
      dispatch(locationChange("outSide"));
    } else {
      dispatch(locationChange("inSide"));
    }
  };
  const clickNeko = () =>{
    dispatch(locationChange("inSide"));

  }

  return (
    <div className="house">
      House
      <div></div>
      <img src={imgHouse} alt=""></img>
      <button onClick={() => clickButton()}>電気</button>
      <button onClick={() => ClickHouse()}>猫カモン</button>
    </div>
  );
}

export default House;
