// import React,{ useState } from " react"
import { Container, STRAPI_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/navbarSlice";
// import { useEffect } from "react";


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
const MyPage = () => {
  const token = useSelector((store: any) => store.navbar.token);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const getMe = async (text: any) => {
    // if (!token) {
    //   navigate("/login");
    // }
    const res = await axios.get(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const { isLoading, error, data } = useQuery(["getMe"], () => getMe("aiueo"));
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    navigate("/login");
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  // useEffect(() => {
  //   // If LineId and jwt are both present navigate to "/consultant"
  //   if (token) {
  //     navigate("/my-page");
  //   } else if (!token) {
  //     // If no jwt navigate to "/login"
  //     navigate("/login");
  //   }
  // }, [token]);
// console.log(data);
  return (
    <Container>
      <h2>マイページ</h2>
        <Layout>
        <div style={{ background: "red", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <img
        src={data.avatar_url ? `${STRAPI_URL}${data.avatar_url}` : "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"}
        alt="" width={80} height={80} style={{ borderRadius: "50%", objectFit: "cover" }} />
        <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div style={{ position: "relative", background: "white", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column" }}>
          <DlTag><DtTag>お名前:</DtTag><DdTag>{data.username}</DdTag></DlTag>
          <DlTag><DtTag>国籍:</DtTag><DdTag>{data.nationality}</DdTag></DlTag>
          <DlTag><DtTag>生年月日:</DtTag><DdTag>{data.birthday}</DdTag></DlTag>
          <DlTag><DtTag>性別:</DtTag><DdTag>{data.gender}</DdTag></DlTag>
          <DlTag><DtTag>自己紹介:</DtTag><DdTag>{data.introduce}</DdTag></DlTag>
        {JSON.stringify(data)}
        </div>
      </Layout>
    </Container>
  );
};

export default MyPage;
