import React, { useState } from "react";
import imgNeko from "./assets/neko.png";
import { useDispatch, useSelector } from "react-redux";
import { lightChange } from "./redux/slices/lightSlice";

const Neko = () => {
  const dispatch = useDispatch();
  const box = document.querySelector(".neko") as HTMLDivElement | null;
  // const [toggle, setToggle] = useState(true);

  const lightSwitch = useSelector((store: any) => store.light.lightOn); //lấy biến initialState
  // const test = useSelector((store: any) => store.light.test) //lấy biến initialState
  if (box) {
	if (lightSwitch) {
	  box.style.background = "white";
	} else {
	  box.style.background = "black";
	}
  }
  //neko
  const location = useSelector((store : any) => store.location.location);

  const clickButton = () => {
    console.log(lightSwitch);
    dispatch(lightChange(!lightSwitch));
  };
  sessionStorage.setItem

  return (
    <div className="neko">
      <img className={location} src={imgNeko} alt="" />
      <button onClick={() => clickButton()}>電気</button>
    </div>
  );
};

export default Neko;
