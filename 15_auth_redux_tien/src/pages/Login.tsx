import { Container, NESTJS_URL, } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validation } from "../common/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../redux/slices/authSlice";
import { useState } from "react";

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
			return axios.post(`${NESTJS_URL}/auth/login`, newPost);
		},
		onSuccess: (data) => {
			setErrorMessenger("")
			// console.log(data);
			// cookieに格納する
			dispatch(userLoginSuccess(data.data.result.token));
			navigate("/mypage");

			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			// queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
		onError: (errors: any) => {
				setErrorMessenger(errors.message);
				// console.log("Error: " + errors);
				// setErrorMessenger("Request failed with status code 500");
		  }
	});

	const onSubmit = (data: LoginForm) => {
		// console.log("ログイン成功");
		// console.log(data);
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
