import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
	max-width: 800px;
	background: white;
	margin: 0 auto;
	.message {
		color: red;
		font-size: 2rem;
	}
	input {
		width: 200px;
		height: 30px;
		padding: 0 5px;
	}
`;

const Register = () => {
	const [message, setMessage] = useState("");
	const refUsername = useRef();
	const refEmail = useRef();
	const refPassword = useRef();

	const clickSubmit = () => {
		axios
			.post("http://localhost:1337/api/auth/local/register", {
				username: refUsername.current.value,
				email: refEmail.current.value,
				password: refPassword.current.value,
			})
			.then((response) => {
				console.log(response);
				setMessage("新規登録完了！");
			})
			.catch((error) => {
				console.log("エラー");

				console.log(error);
				console.log(error.response.data.error.message);
				setMessage(error.response.data.error.message);
			});
	};
	return (
		<Container>
			Register
			<div className="message">{message}</div>
			<p>username</p>
			<input ref={refUsername}></input>
			<p>email</p>
			<input ref={refEmail}></input>
			<p>password</p>
			<input ref={refPassword}></input>
			<br />
			<button onClick={() => clickSubmit()}>送信</button>
		</Container>
	);
};

export default Register;
