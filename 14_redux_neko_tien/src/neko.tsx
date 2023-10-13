import React, { useState } from "react";
import imgNeko from "./assets/neko.png";
import { useDispatch, useSelector } from "react-redux";
import { lightChange } from "./redux/slices/lightSlice";

const Neko = () => {
    const dispatch = useDispatch();
	// const [toggle, setToggle] = useState(true);

	const lightSwitch = useSelector((store: any) => store.light.lightOn) //lấy biến initialState
	const test = useSelector((store: any) => store.light.test) //lấy biến initialState
	const clickButton = () => {
		// console.log(lightSwitch);
		// console.log(test);

		dispatch(lightChange(!lightSwitch));
		const box = document.querySelector(".neko") as HTMLDivElement | null;
		if (!lightSwitch) {
			box.style.background = "black";
		} else {
			box.style.background = "red";
		};
	};

	return (
		<div className="neko">
			<img src={imgNeko} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default Neko;
