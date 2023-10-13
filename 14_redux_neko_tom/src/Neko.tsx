import { useDispatch, useSelector } from "react-redux";
import { onoff } from "./redux/slices/houseSlice";
import type { RootState } from "./redux/store";

import imgNeko from "./assets/neko.png";

const Neko = () => {
	const dispatch = useDispatch();

	//家のスイッチ
	const house = useSelector((state: RootState) => state.house);
	const cn = house.house_light ? "neko" : "neko dark";

	const clickButton = () => {
		dispatch(onoff({ on: !house.house_light }));
	};

	return (
		<div className={cn}>
			<img src={imgNeko} alt="" />
			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default Neko;
