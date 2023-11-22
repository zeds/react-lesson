import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Mypage from "./pages/Mypage";
import Chat from "./pages/Chat";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/about" element={<About />} />
				<Route path="/users" element={<Users />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/chat" element={<Chat />} />
			</Routes>
		</>
	);
}

export default App;
