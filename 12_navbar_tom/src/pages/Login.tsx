import { Container } from "../GlobalStyle";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { validation } from "../common/validation";

const Form = styled.div`
	width: 400px;
	margin: 0 auto;
	margin-top: 40px;
`;

const Header = styled.div`
	margin-bottom: 20px;
`;

const Wrapper = styled.div`
	width: 400px;
	padding: 30px;
	border: 1px solid lightgray;
	border-radius: 4px;
	background: white;

	.recaptcha {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.link {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		color: gray;
		font-size: 1.4rem;
		text-decoration: underline;
		&:hover {
			cursor: pointer;
		}
	}
`;

interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onChange",
	}); // "onBlur"
	// "onBlur": fieldがfocusを失った時呼ばれる
	// "onChange": submitが押された時呼ばれる

	const onSubmit = (data: LoginForm) => {
		console.log(data.email);
	};

	return (
		<Container>
			<Form>
				<Header>
					<h2>ログイン</h2>
				</Header>
				<Wrapper>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type="email"
							name="email"
							label="メールアドレス"
							placeholder="mail@example.com"
							errors={errors}
							register={register}
							validationSchema={validation[1]}
							required={false}
						/>
						<Input
							type="password"
							name="password"
							label="パスワード"
							placeholder=""
							errors={errors}
							register={register}
							validationSchema={validation[2]}
							required={false}
						/>
						<Button label="ログイン" />
						<hr />
						<Link className="link" to="/register">
							会員登録はこちら
						</Link>
					</form>
				</Wrapper>
			</Form>
		</Container>
	);
};

export default Login;
