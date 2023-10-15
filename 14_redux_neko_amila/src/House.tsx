import { useDispatch, useSelector } from "react-redux";
import { onoff } from "./redux/slices/houseSlice";
import { gohome } from "./redux/slices/nekoSlice";
import type { RootState } from "./redux/store";

import imgHouse from "./assets/house.png";
import imgNeko from "./assets/neko.png";

const House = () => {
	const dispatch = useDispatch();

	//家のスイッチ
	const house = useSelector((state: RootState) => state.house);
	const cn = house.house_light ? "house" : "house dark";

	//猫
	const neko = useSelector((state: RootState) => state.neko);
	const nn = neko.location == "inside" ? true : false;

	const clickButton = () => {
		dispatch(onoff({ on: !house.house_light }));
	};
	const clickNekoButton = () => {
		console.log("location=", neko.location);
		dispatch(gohome({ location: "inside" }));
	};
	const clickNeko = () => {
		dispatch(gohome({ location: "outside" }));
	};

	return (
		<>
			<div className={cn}>
				<img src={imgHouse} alt="" />
				<button onClick={() => clickButton()}>電気</button>
				<button onClick={() => clickNekoButton()}>猫カモン</button>
				{nn ? (
					<div onClick={() => clickNeko()}>
						<img src={imgNeko} alt="" />
					</div>
				) : null}
			</div>
		</>
	);
};

export default House;