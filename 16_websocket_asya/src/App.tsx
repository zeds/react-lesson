import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Mypage from "./pages/Mypage";
import Chat from "./pages/Chat";
import ChatHomePage from "./pages/ChatHomePage";
import ChatRoomPage from './pages/ChatRoomPage';
import { UserProvider } from './pages/UserContext';


function App() {
	return (
		<>
			<UserProvider>
				<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/about" element={<About />} />
				<Route path="/users" element={<Users />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/chatHome" element={<ChatHomePage />} />
        		<Route path="/chat/:roomName" element={<ChatRoomPage />} />
			</Routes>
			</UserProvider>
			
		</>
	);
}

export default App;
