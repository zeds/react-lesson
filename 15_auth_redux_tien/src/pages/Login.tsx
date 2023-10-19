import { Container, NESTJS_URL, 
	// STRAPI_URL
 } from "../GlobalStyle";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validation } from "../common/validation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../redux/slices/authSlice";
import { useState } from "react";
// import { showMessage } from "../";

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

interface LoginForm {
	identifier: string; // strapiはemailではなくidentifierを使っている
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
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessenger, setErrorMessenger] = useState("");

	const postData = useMutation({
		mutationFn: (newPost: LoginForm) => {
			// console.log(newPost)
			return axios.post(`${NESTJS_URL}/auth/login`, newPost);
			// return axios.post(`${STRAPI_URL}/api/auth/local`, newPost);
		},
		onSuccess: (data) => {
			setErrorMessenger("")
			console.log(data);
			// console.log(dataresult.jwt);
			// cookieに格納する
			dispatch(userLoginSuccess(data.data.result.token));

			// rootを開く
			console.log("rootを開く");

			navigate("/");

			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			// queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
		onError: (errors: string) => {
			// if(errors == "AxiosError: Request failed with status code 400"){
				// }
				// setErrorMessenger(errors.message);
				console.log("Error: " + errors);
				setErrorMessenger("Request failed with status code 500");
			// console.log("Error: " + context);
		  }
	});

	const onSubmit = (data: LoginForm) => {
		console.log("ログイン成功");
		console.log(data);
		postData.mutate(data);
	};

	return (
		<Container>
			<Form>
				<Header>
					<h2>ログイン</h2>
				</Header>
				<p className="error">{errorMessenger}</p>
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
