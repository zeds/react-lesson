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
	const [user, setUser] = useState([1, 2, 3]);

	const updateUser = () => {
		const addImmutable = [...user, { name: "tom", age: 18 }];
		setUser(addImmutable);
	};
	const showUser = () => {
		user[0].name = "Nancy";
		setUser([...user]);
		console.log(user);
	};

	return (
		<div>
			<h1>
				{user.map((item, index) => (
					<div key={index}>
						{item.name}:{item.age}
					</div>
				))}
			</h1>

			<button onClick={updateUser}>Click me</button>
			<button onClick={showUser}>Show me</button>
		</div>
	);
};

export default Counter;
