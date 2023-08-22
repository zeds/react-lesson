import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import Styled from "./pages/Styled";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/item" element={<Detail />}></Route>
                <Route path="/styled" element={<Styled />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
