import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

// import neko1 from "../assets/neko1.png";
// import neko2 from "../assets/neko2.png";
// import neko3 from "../assets/neko3.jpeg";

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	background: gray;
	display: flex;
	justify-content: center;
	font-size: 20px;
	img {
		width: 300px;
	}
	button {
		width: 50px;
		height: 50px;
	}
`;
const students = [
	{ id: 1, name: "mexroj" },
	{ id: 2, name: "tom" },
	{ id: 3, name: "asha" },
	{ id: 4, name: "asil" },
	{ id: 5, name: "amil" },
];

const Counter = () => {
	const [moji, setMoji] = useState(
		"あいうえお");
   
	return (
		<Container>
			<h1>{moji}</h1>
			<button onClick={() => setMoji("かきくけこ")}>変更</button>
		</Container>
	);
};

export default Counter;
