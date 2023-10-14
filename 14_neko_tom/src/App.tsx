import { useState } from "react";
import House from "./House";
import Neko from "./Neko";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<House />
			<Neko />
		</>
	);
}

export default App;
