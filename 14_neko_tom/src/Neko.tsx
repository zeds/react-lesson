import React, { useState } from "react";
import neko from "./assets/neko.png";

const Neko = () => {
	const [light, setLight] = useState(false);

	const cn = light ? "neko" : "neko dark";
	const clickButton = () => {
		setLight(!light);
	};

	return (
		<div className={cn}>
			Neko
			<img src={neko} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default Neko;
