// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import Styled from "./pages/Styled";
import styled from "styled-components";


 const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:skyblue;
    text-decoration: none;
 `
function App() {
    return (
        <BrowserRouter>
        <Container>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/item" element={<Detail />}></Route>
                <Route path="/styled" element={<Styled />}></Route>
            </Routes>
            </Container>

        </BrowserRouter>
    );
}

export default App;
