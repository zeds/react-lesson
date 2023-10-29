// import GlobalStyle from "./GlobalStyle";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Comment from "./components/Comment";
import React from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";

// Create a client
// const queryClient = new QueryClient();

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

// <> </>フラグメント

function App() {
	return (
		<>
		{/* <GlobalStyle /> */}
			{/* <QueryClientProvider client={queryClient}> */}
				{/* <BrowserRouter> */}
					<Container>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/item" element={<Detail />}/>
							<Route path="/comment" element={<Comment />}/>
							<Route path="/login" element={<Login />}/>
						</Routes>
					</Container>
				{/* </BrowserRouter> */}
			{/* </QueryClientProvider> */}
		</>
	);
}

export default App;
