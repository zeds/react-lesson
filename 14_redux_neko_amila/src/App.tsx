import Neko from "./Neko";
import House from "./House";
import { useDispatch } from "react-redux";
import { gohome } from "./redux/slices/nekoSlice"

function App() {
	const dispatch = useDispatch();
	return (
		<>
			<Neko />
			<House />
		</>
	);
}

export default App;