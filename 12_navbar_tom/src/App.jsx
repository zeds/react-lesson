import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	);
}

export default App;
