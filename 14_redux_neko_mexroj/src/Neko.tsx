import { useDispatch, useSelector } from "react-redux";
import { onoff } from "./redux/slices/houseSlice";
import { gohome } from "./redux/slices/nekoSlice";
import type { RootState } from "./redux/store";

import imgNeko from "./assets/neko.png";

const Neko = () => {
	const dispatch = useDispatch();

	//家のスイッチ
	const house = useSelector((state: RootState) => state.house);
	const cn = house.house_light ? "neko" : "neko dark";

	//猫
	const neko = useSelector((state: RootState) => state.neko);
	const nn = neko.location == "outside" ? true : false;

	const clickButton = () => {
		console.log(nn);
		dispatch(onoff({ on: !house.house_light }));
	};
	const clickNeko = () => {
		dispatch(gohome({ location: "inside" }));
	};

	return (
		<div className={cn}>
			{nn ? (
				<div onClick={() => clickNeko()}>
					<img src={imgNeko} alt="" />
				</div>
			) : null}

			<button onClick={() => clickButton()}>電気</button>
		</div>
	);
};

export default Neko;
