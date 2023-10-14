import React, { useState } from "react";
import house from "./assets/house.png";
import { onoff } from "./redux/slices/houseSlice";
import type { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

const House = () => {
	const dispatch = useDispatch();

	const [light, setLight] = useState(false);

	const cn = light ? "house" : "house dark";

	const clickButton = () => {
		setLight(!light);
		dispatch(onoff({ on: !light }));
	};

	return (
		<div className={cn}>
			House
			<img src={house} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default House;
