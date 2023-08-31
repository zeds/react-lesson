// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import Styled from "./pages/Styled";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";


 const Container = styled.div`
    width: 100%;
    height: 100vh;
    text-decoration: none;
 `
//  <>//flugment
function App() {
    return (
        <>
        <GlobalStyle />
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
        </>
    );
}

export default App;