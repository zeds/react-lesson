import { useSelector } from "react-redux";
import neko from "./assets/neko.png";
import type { RootState } from "./redux/store";

const Neko = () => {
	//家のスイッチ
	const house = useSelector((state: RootState) => state.house);
	const cn = house.house_light ? "neko" : "neko dark";

	const clickButton = () => {
		// setLight(!light);
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
