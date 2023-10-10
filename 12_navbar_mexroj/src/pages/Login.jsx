import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
	max-width: 800px;
	background: white;
	margin: 0 auto;
	padding: 62px 0;
	input {
		width: 200px;
		height: 30px;
		padding: 0 5px;
	}
`;

const Login = () => {
	const clickSubmit = () => {
		alert("click");
		axios
			.post("http://localhost:1337/api/auth/local", {
				identifier: "tom.zed39@gmail.com",
				password: "yellow",
			})
			.then((response) => {
				console.log(response);
			});
	};
	return (
		<Container>
			Login
			<p>email</p>
			<input></input>
			<p>password</p>
			<input></input>
			<br />
			<button onClick={() => clickSubmit()}>送信</button>
		</Container>
	);
};

export default Login;
