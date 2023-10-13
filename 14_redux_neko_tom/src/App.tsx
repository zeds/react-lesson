import { useState } from "react";
import Neko from "./Neko";
import House from "./House";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Neko />
			<House />
		</>
	);
}

export default App;
