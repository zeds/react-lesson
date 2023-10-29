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

const Counter = () => {
	let [count, setCount] = useState(0);
	let [img, setImg] = useState(neko1);
	const array = [neko1, neko2, neko3];

	const immutable = [
		{ label: "immutable0", immutableValue: 0 },
		{ label: "immutable1", immutableValue: 1 },
		{ label: "immutable2", immutableValue: 2 },
	];
	const addImmutable = [
		...immutable,
		{ label: "immutable3", immutableValue: 3 },
	];
	console.log(immutable);
	console.log(addImmutable);

	const clickLeftButton = () => {
		if (count > 0) {
			setCount(count - 1);
			setImg(array[count - 1]);
		}
	};
	const clickRightButton = () => {
		if (count < 2) {
			setCount(count + 1);
			setImg(array[count + 1]);
		}
	};

	return (
		<Container>
			<p>{count}</p>
			<button onClick={() => clickLeftButton()}>⬅︎</button>
			<img src={img} alt="JAMP" />
			<button onClick={() => clickRightButton()}>🔜</button>
		</Container>
	);
};

export default Counter;
