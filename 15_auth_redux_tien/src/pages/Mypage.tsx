import React, { useEffect, useState } from "react";
import { Container, NESTJS_URL } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validation } from "../common/validation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
import { showMessage } from "../redux/slices/uxSlice";

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 20px;
	margin: 25px 0;
	@media screen and (max-width: 896px) {
		grid-template-columns: 1fr;
	}
`
const DlTag = styled.dl`
  display: flex;
  width: 100%;
  border-bottom: 2px solid #8080800f;
  padding: 8px 0;
  `
const DtTag = styled.dt`
  flex: 1;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  `
const DdTag = styled.dd`
  flex: 2;
  font-size: 1.3rem;
  font-weight: 400;
  width: 100%;
`

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const token = useSelector((state: RootState) => state.auth.jwt);
//   console.log(token);
useEffect(() => {
  if (!token) {
	navigate("/login");
	return;
  }
}, [token]);

  const getMe = async (text: any) => {
    try {
      const res = await axios.get(
        `${NESTJS_URL}/users/`,
        {
          // const res = await axios.get(`${STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setEmail(res.data.email);
      return res.data;
    } catch (error) {
      console.log("error=" + error);
      return null;
    }
  };

  // 😺CRUDのRead
  const { isLoading, isError, data } = useQuery(["getme"], () =>
    getMe("aiueo")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log("isError");
    navigate("/login");
  }

  const clickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(clear(token));
  };
  const handleChange = () => {
    dispatch(showMessage(true));
  console.log("handleChange");
  let postData = {
    email: email,
  }

}
const imageUrl = data?.avatar_url ? `${NESTJS_URL}${data.avatar_url}` : "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
  return (
    <Container>
      <h2>マイページ</h2>
        <Layout>
        <div style={{ background: "red", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",minWidth: "200px" }}>
        <img
        src={imageUrl}
        alt="" width={80} height={80} style={{ borderRadius: "50%", objectFit: "cover" }} />
        <button onClick={clickLogout}>ログアウト</button>
        </div>
        <div style={{ zIndex: "0", position: "relative", background: "white", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column",width: "auto" }}>
          <button onClick={handleChange}>更新</button>
          <DlTag><DtTag>Id:</DtTag><DdTag>{data?.id}</DdTag></DlTag>
          <DlTag><DtTag>お名前:</DtTag><DdTag>{data?.name}</DdTag></DlTag>
          <DlTag><DtTag>UserName:</DtTag><DdTag>{data?.username}</DdTag></DlTag>
          <DlTag><DtTag>メールアドレス:</DtTag><DdTag><input value={email} onChange={(e)=>setEmail(e.target.value)}>{data?.email}</input></DdTag></DlTag>
          {/* <DlTag><DtTag>国籍:</DtTag><DdTag>{data.nationality}</DdTag></DlTag>
          <DlTag><DtTag>生年月日:</DtTag><DdTag>{data.birthday}</DdTag></DlTag>
          <DlTag><DtTag>性別:</DtTag><DdTag>{data.gender}</DdTag></DlTag>
          <DlTag><DtTag>自己紹介:</DtTag><DdTag>{data.introduce}</DdTag></DlTag> */}
        {/* <p>{JSON.stringify(data)}</p> */}
        </div>
      </Layout>
    </Container>
  );
};

export default Mypage;
