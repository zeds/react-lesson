import { useState } from "react";
import imgNeko from "./assets/house.png";

const House = () => {
	const [toggle, setToggle] = useState(false);

	const clickButton = () => {
		setToggle(!toggle);
		const box = document.querySelector(".house") as HTMLDivElement | null;
		if (toggle) {
			box.style.background = "red";
		} else {
			box.style.background = "black";
		}
	};

	return (
		<div className="house">
			<img src={imgNeko} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default House;
