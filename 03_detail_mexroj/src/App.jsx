import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import Styled from "./pages/Styled";
import styled from "styled-components";
import Comment from "./pages/Comment";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Counter from "./components/Counter";
// Create a client
const queryClient = new QueryClient();

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

// <> </>フラグメント

function App() {
	return (
		<>
			<GlobalStyle />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Container>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/item" element={<Detail />}></Route>
							<Route path="/styled" element={<Styled />}></Route>
							<Route path="/comment" element={<Comment />}></Route>
							<Route path="/counter" element={<Counter />}></Route>
						</Routes>
					</Container>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
