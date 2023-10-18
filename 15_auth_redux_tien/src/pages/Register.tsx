import { Container, NESTJS_URL } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
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
	max-width: 400px;
	margin: 0 auto;
	margin-top: 40px;
	.error {
		font-size: 2rem;
		color: red;
		padding: 0 10px;
		margin: 5px auto;
	}
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
	const navigate = useNavigate();
	const [errorMessenger, setErrorMessenger] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		mode: "onChange", // onBluer: フォーカスを失った時に呼ばれる
	});

	const postData = useMutation({
		mutationFn: (newPost: RegisterForm) => {
			// console.log("newPost=" + JSON.stringify(newPost));
			console.log("newPost=" + newPost);
			// newPost.name="tiennn"
			return axios.post(`${NESTJS_URL}/auth/register`, newPost);
			// return axios.post(`${STRAPI_URL}/api/auth/local/register`, newPost);
		},
		onSuccess: (data) => {
			// setErrorMessenger("")
			console.log(data.data);
			navigate("/");
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			// queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
		onError: (errors) => {
			if(errors == "AxiosError: Request failed with status code 400"){
				setErrorMessenger("このメールアドレスは以前に登録されていました。	")
			}
			// setErrorMessenger(errors.message);
			console.log("Error: " + errors);
			// console.log("Error: " + context);
		  }
	});

	const onSubmit = (data: RegisterForm) => {
		console.log(JSON.stringify(data));
		postData.mutate(data);
	};

	return (
		<Container>
			<Form>
				<Header>
					<h2>会員登録</h2>
				</Header>
				<p className="error">{errorMessenger}</p>
				<Wrapper>
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
							type="text"
							name="name"
							label="名前"
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
