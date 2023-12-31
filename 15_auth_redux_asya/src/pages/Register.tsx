import { Container, NESTJS_URL } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { validation } from "../common/validation";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../redux/slices/authSlice";

const Form = styled.div`
	max-width: 400px;
	margin: 0 auto;
	margin-top: 40px;
`;

const Header = styled.div`
	margin-bottom: 20px;
`;

const Wrapper = styled.div`
	margin: 0 auto;
	padding: 20px;
	border: 1px solid lightgray;
	border-radius: 4px;
	background: white;

	.duplicate {
		font-size: 1.5rem;
		color: red;
		font-weight: bold;
	}
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
	username: string;
	email: string;
	password: string;
	name: string;
}

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let errorMessage = "";

	const {
		register,
		handleSubmit,
		formState: { errors },
		// setValue,
	} = useForm<RegisterForm>({
		mode: "onChange", // onBluer: フォーカスを失った時に呼ばれる
	});

	useEffect(() => {
		console.log("useEffect");
		// setValue("username", "Tsutomu Okumura");
	}, []);

	const { data, isSuccess, isError, error, mutate } = useMutation({
		mutationFn: (newPost: RegisterForm) => {
			console.log("newPost=" + JSON.stringify(newPost));
			return axios.post(`${NESTJS_URL}/auth/register`, newPost);
		},
		onError: (error: any) => {
			console.log("c=" + error.response.data.error.message);
			// setErrorMessage(error.response.data.error.message);
		},
	});

	const onSubmit = (data: RegisterForm) => {
		console.log("onSubmit:", JSON.stringify(data));
		mutate(data);
	};

	if (isSuccess) {
		console.log("isSuccess token:", data.data.result.token);
		console.log(data.data);
		//local storageにjwtを格納する
		dispatch(userLoginSuccess(data.data.result.token));

		navigate("/");
		//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
		// queryClient.invalidateQueries({ queryKey: ["comments"] });
	}

	if (isError) {
		console.log("isError error=", error);
		const message = error.response.data.message;
		errorMessage = message;
	}

	return (
		<Container>
			<Form>
				<Header>
					<h2>会員登録</h2>
				</Header>
				<Wrapper>
					<div className="duplicate">{errorMessage}</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type="text"
							name="username"
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
						{/* <ReCAPTCHA
							className="recaptcha"
							sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
						/> */}
						<Button label="同意して登録する" />
						<hr />
						<Link className="link" to="/login">
							ログインはこちら
						</Link>
					</form>
				</Wrapper>
			</Form>
		</Container>
	);
};

export default Register;
