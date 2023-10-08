import { Container } from "../GlobalStyle";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Box = styled.div`
	width: 400px;
	margin: 0 auto;
	background: lightgray;
	font-size: 1.4rem;
	margin-top: 80px;
	padding: 20px;
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
			ログイン
			<Box>
				<p>メールアドレス</p>
				<input></input>
				<p>パスワード</p>
				<input></input>
				<br />
				<button onClick={() => clickSubmit()}>送信</button>
			</Box>
		</Container>
	);
};

export default Login;
