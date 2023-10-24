import { useEffect, useState } from "react";
import { Container, DISPLAY_CT, NESTJS_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
// import { showMessage } from "../redux/slices/uxSlice";
import edit from "../../src/assets/edit.svg";
import Modal from "../components/Modal";
import { DotLoader } from "react-spinner-overlay";
import imageDefault from "../assets/images.jpeg";

const SpinnerContainer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 25px 0;
  @media screen and (max-width: 896px) {
    grid-template-columns: 1fr;
  }
`;
const DlTag = styled.dl`
  display: flex;
  width: 100%;
  border-bottom: 2px solid #8080800f;
  padding: 8px 0;
  @media screen and (max-width: ${DISPLAY_CT}) {
    display: block;
    
  }
`;
const DtTag = styled.dt`
  flex: 1;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
`;
const DdTag = styled.dd`
  flex: 2;
  font-size: 1.3rem;
  font-weight: 400;
`;
const Introduction = styled.div`
    height: auto;
    width: 67%;
    flex-wrap: nowrap;
    display: flex;
    word-break: break-word;
`
const Mypage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    avatar_url: "",
    introduction: "",
    name: "",
    username: "",
  });

  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.jwt);

  //khi load thì không thể contoro
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token]);

  const postData = useMutation({
    mutationFn: async (newPost: any) => {
      return await axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      console.log(data);
    },
    onError: (data: any) => {
      console.log(data);
    },
  });

  const getMe = async () => {
    try {
      const res = await axios.get(`${NESTJS_URL}/users/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(res.data.id);

      return res.data;
      
    } catch (error) {
      console.log("error=" + error);
      return null;
    }
  };

  // 😺CRUDのRead
  const { isLoading, isError, data } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
  });
  if (isLoading) {
    return (
      <SpinnerContainer>
        <DotLoader loading={loading} size={50} />
      </SpinnerContainer>
    );
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
  // console.log(data);
  const handleChange = (item: any) => {
    // console.log(item);
    let imageUrl = "";
    imageUrl = `https://lusty.asia:1443/${item.avatar_url}`;
    setModalData({
      avatar_url: imageUrl,
      name: data.name,
      username: data.username,
      introduction: data.introduction,
    });
    setShow(true);
  };
  // 🐙 Close Modal
  const closeModal = () => {
    setShow(false);
  };
  const postModal = (data: any) => {
    setShow(false);
    setLoading(true);
    if (data.file) {
      const formData = new FormData();
      formData.append("files", data.file);
      axios
        .post("https://lusty.asia:1443/api/upload", formData)
        .then((response) => {
          console.log("res=", response.data[0].url);
          data.avatar_url = response.data[0].url;
          postData.mutate(
            // {data:
            {
              avatar_url: data.avatar_url,
              name: data.name,
              username: data.username,
              introduction: data.introduction,
            }
            // }
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log("error movie:", error);
        });
    } else {
      console.log("なし");
      postData.mutate(
        // {data:
        {
          name: data.name,
          username: data.username,
          introduction: data.introduction,
        }
        // }
      );
    }
  };
  const imageUrl = data?.avatar_url ? `https://lusty.asia:1443${data.avatar_url}`: imageDefault;
    return (
      <>
      {/* {loading ? (
				<SpinnerContainer>
					<DotLoader loading={loading} size={50} />
				</SpinnerContainer>
			) : null} */}
      {show && (
        <Modal setModal={setLoading} post={postModal} close={closeModal} data={modalData} />
        )}
        <Container>
          <h2>マイページ</h2>
            <Layout>
            <div style={{ background: "red", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img
            src={imageUrl}
            alt="" width={80} height={80} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <br />
            <button onClick={clickLogout}>ログアウト</button>
            </div>
            <div style={{ position: "relative", background: "white", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column",width: "auto" }}>
              <DlTag><DtTag>Id:</DtTag><DdTag>{data?.id}</DdTag></DlTag>
              <DlTag><DtTag>メールアドレス:</DtTag><DdTag>{data?.email}</DdTag></DlTag>
              <DlTag><DtTag>お名前:</DtTag><DdTag>{data?.name}</DdTag></DlTag>
              <DlTag><DtTag>UserName:</DtTag><DdTag>{data?.username}</DdTag></DlTag>
              <DlTag><DtTag>自己紹介:</DtTag><Introduction>{data?.introduction}</Introduction></DlTag>
              {/* <DlTag><DtTag>国籍:</DtTag><DdTag>{data.nationality}</DdTag></DlTag>
              <DlTag><DtTag>生年月日:</DtTag><DdTag>{data.birthday}</DdTag></DlTag>
              <DlTag><DtTag>性別:</DtTag><DdTag>{data.gender}</DdTag></DlTag>
            <DlTag><DtTag>自己紹介:</DtTag><DdTag>{data.introduce}</DdTag></DlTag> */}
            {/* <p>{JSON.stringify(data)}</p> */}
            </div>
          </Layout>
          <button onClick={()=>handleChange(data)}><img src={edit} alt="" />更新</button>
        </Container>
      </>
    );
};

export default Mypage;
