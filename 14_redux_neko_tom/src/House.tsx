import { useDispatch, useSelector } from "react-redux";
import { onoff } from "./redux/slices/houseSlice";
import type { RootState } from "./redux/store";

import imgHouse from "./assets/house.png";

const House = () => {
	const dispatch = useDispatch();

	//家のスイッチ
	const house = useSelector((state: RootState) => state.house);
	const cn = house.house_light ? "house" : "house dark";

	const clickButton = () => {
		dispatch(onoff({ on: !house.house_light }));
	};

	return (
		<div className={cn}>
			<img src={imgHouse} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default House;
