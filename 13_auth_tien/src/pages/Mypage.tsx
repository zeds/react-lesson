// import React,{ useState } from " react"
import { Container, STRAPI_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery,} from "@tanstack/react-query";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const getMe = async (text: any) => {
	const token = localStorage.getItem("token");
	if(!token){
		navigate("/login");
	}
    const res = await axios.get(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const { isLoading, error, data } = useQuery(["getMe"], () =>
    getMe("aiueo")
  );
  if (isLoading){
return <div>Loading....</div>
  }
  if(error){
	navigate("/login")
  }
  const handleLogout = () => {
	localStorage.removeItem("token");
	navigate("/login")
  }
    return (
      <Container>
        マイページ
        <div>
          {JSON.stringify(data)}
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </Container>
    );
};

export default MyPage;
