import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import neko1 from "../assets/neko1.png";
import neko2 from "../assets/neko2.png";
import neko3 from "../assets/neko3.jpeg";

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

const Counter = (e) => {
	const [moji, setMoji] = useState("あいうえお");

	useEffect(() => {
		setMoji("かきくけこ");
	}, []);

	return (
		<Container>
			<h1>{moji}</h1>
		</Container>
	);
};

export default Counter;
