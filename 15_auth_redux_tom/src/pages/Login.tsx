import { Container, NESTJS_URL } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validation } from "../common/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLoginSuccess } from "../redux/slices/authSlice";
import { showMessage } from "../redux/slices/uxSlice";
import { RootState } from "../redux/store";

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

interface LoginForm {
	email: string; // strapiはemailではなくidentifierを使っている
	password: string;
}

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let errorMessage = "";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onBlur", // or "onChange"
	});

	const { data, isSuccess, isError, error, mutate } = useMutation(
		async (newPost: LoginForm) => {
			return await axios.post(`${NESTJS_URL}/auth/login`, newPost);
		},
		{
			onError(error: any, variables, context) {
				console.log("error=", error);
			},
		}
	);

	if (isSuccess) {
		console.log("login data=", data.data);

		// local storageにjwtを格納する
		dispatch(userLoginSuccess(data.data.result.token));

		dispatch(showMessage({ show: false }));

		// rootを開く
		console.log("current_page_urlを開く");

		navigate("/");

		//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
		// queryClient.invalidateQueries({ queryKey: ["comments"] });
	}

	if (isError) {
		console.log("isError error=", error);
		errorMessage = error.response.data.message;
	}

	const onSubmit = (data: LoginForm) => {
		console.log(`${NESTJS_URL}/api/auth/local`);
		dispatch(
			showMessage({
				show: true,
				animation: true,
				button: false,
				message: "ログインしています。。。",
			})
		);
		mutate(data);
	};

	return (
		<Container>
			<Form>
				<Header>
					<h2>ログイン</h2>
				</Header>
				<Wrapper>
					<div className="duplicate">{errorMessage}</div>

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
