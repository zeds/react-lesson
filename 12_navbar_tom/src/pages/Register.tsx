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

interface RegisterForm {
	name: string;
	email: string;
	password: string;
}

const validation = [
	{
		required: "名前は必須",
		minLength: {
			value: 3,
			message: "3文字以上で入力してください",
		},
	},
	{
		required: "emailは必須",
		pattern: {
			value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
			message: "入力形式がメールアドレスではありません。",
		},
	},
	{
		required: "passwordは必須",
		minLength: {
			value: 6,
			message: "6文字以上で入力してください",
		},
	},
];

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		mode: "onChange",
	}); // "onBlur"
	// "onBlur": fieldがfocusを失った時呼ばれる
	// "onChange": submitが押された時呼ばれる

	const onSubmit = (data: RegisterForm) => {
		console.log(data.name);
	};

	return (
		<Container>
			<Form>
				<Header>
					<h2>会員登録</h2>
				</Header>
				<Wrapper>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type="text"
							name="name"
							label="表示される名前"
							placeholder="〇〇さん"
							errors={errors}
							register={register}
							validationSchema={validation[0]}
							required
						/>
						<Input
							type="email"
							name="email"
							label="メールアドレス"
							placeholder="mail@example.com"
							errors={errors}
							register={register}
							validationSchema={validation[1]}
							required
						/>
						<Input
							type="password"
							name="password"
							label="パスワード"
							placeholder=""
							errors={errors}
							register={register}
							validationSchema={validation[2]}
							required
						/>
						<ReCAPTCHA
							className="recaptcha"
							sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
						/>
						<Button label="同意して登録する" />
						<hr />
						<Link className="link" to="/login">
							ログイン
						</Link>
					</form>
				</Wrapper>
			</Form>
		</Container>
	);
};

export default Register;
