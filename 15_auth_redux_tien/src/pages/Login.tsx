import { Container, NESTJS_URL } from "../GlobalStyle";
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
// import { showMessage } from "../redux/slices/uxSlice";

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
  let errorMessenger= ""

  const { data, isSuccess, isError, error, mutate } : {
    data: any;
    isSuccess: boolean;
    isError: boolean;
    error: any | null;
    mutate: any;
  } = useMutation({
    
    mutationFn: (newPost: LoginForm) => {
      axios.defaults.withCredentials = false;
      return axios.post(`${NESTJS_URL}/auth/login`, newPost);
    },
    onSuccess: (data) => {

      // console.log(data);
      // cookieに格納する
      dispatch(userLoginSuccess(data.data.result.token));
      navigate("/mypage");

      //invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
      // queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  //   onError: (error: any) => {
	// 	console.log("c=" + error.response.data.error.message);
	// 	// errorMessage(error.response.data.error.message);
  // },
  });

  const onSubmit = (data: any) => {
    // console.log(`${NESTJS_URL}/api/auth/local`);
    // dispatch(
    // 	showMessage({
    // 		show: true,
    // 		animation: true,
    // 		button: false,
    // 		message: "ログインしています。。。",
    // 	})
    // );
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
    // const message = error.response.data.message
    // const message = error.response.data;
    // console.log(error.response.data.message)
    errorMessenger= error.response.data.message;
    // setErrorMessenger(message);
  }

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
