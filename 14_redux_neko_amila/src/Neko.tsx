import { useState } from "react";
import imgNeko from "./assets/neko.png";

const Neko = () => {
	const [toggle, setToggle] = useState(false);

	const clickButton = () => {
		setToggle(!toggle);
		const box = document.querySelector(".neko") as HTMLDivElement | null;
		if (toggle) {
			box.style.background = "red";
		} else {
			box.style.background = "black";
		}
	};

	return (
		<div className="neko">
			<img src={imgNeko} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default Neko;
