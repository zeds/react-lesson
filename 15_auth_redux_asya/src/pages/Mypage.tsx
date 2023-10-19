import { useEffect, useState } from "react";
import { Container, NESTJS_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
import styled from "styled-components";
import avatar from "../assets/avatar.svg";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { showMessage } from "../redux/slices/uxSlice";

const Header = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.div`
  display: flex;
  width: 800px;
  justify-content: center;
  img {
    width: 100px;
  }
`;

const Grid = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: 100px 1fr;
  font-size: 2rem;
  padding: 15px;
  margin: 0 auto;
  gap: 10px;
`;

interface EditForm {
  username: string;
  name: string;
  email: string;
}

interface UpdateForm {
  name: string;
}

const Mypage = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
	//получение токена из редакс
  const token = useSelector((state: RootState) => state.auth.jwt);
	//запуск в работу
  const {
    register,  //регистрирует инпут текста
    handleSubmit,  //обрабатывает события для отправки формы
    formState: { errors },
  } = useForm<EditForm>({
    mode: "onChange",  //валидация происходит при каждом изменении полей формы
  });
  //отправка данных на сервер
  const postData = useMutation({
    mutationFn: async (newPost: UpdateForm) => {
      return axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => {
      console.log("success");
    },
    onError: (error: any) => {
      console.log("error");
    },
  });
  	//проверка наличия интернет соединения 
  const isOnline: boolean = navigator.onLine;
  if (isOnline === true) {
    console.log("オンラインです");
  } else {
    console.log("オフラインです");
  }
  	// проверка тналичия токена и направление на страничку входа
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  //данные о пользователе из сервера
  const getMe = async () => {
    if (!token) {
      navigate("/login");
      return null;
    }

    try {
      const res = await axios.get(`${NESTJS_URL}/users/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserId(res.data.id);
      setName(res.data.name);

      return res.data;
    } catch (error) {
      console.log("error=" + error);
      return null;
    }
  };
  	//запрос данных о пользователе из react-query
  const { isLoading, isError, data } = useQuery(["getme"], getMe);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log("isError");
    navigate("/login");
  }
  	//выйти из учетки
  const clickLogout = () => {
    dispatch(clear(""));
    navigate("/login");
  };
  	//обновить имя
  const clickUpdate = () => {
    dispatch(showMessage(true));
    let updateData = {
      name: name,
    };
    postData.mutate(updateData);
  };

  return (
    <Container>
      <Header>
        <h1>マイページ</h1>
      </Header>
      <Avatar>
        <img src={avatar} alt="avatar" />
      </Avatar>
      <Grid>
        <div>id</div>
        <div>{data.id}</div>
        <div>username</div>
        <div>{data.username}</div>
        <div>name</div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>email</div>
        <div>{data.email}</div>
      </Grid>
      <button onClick={() => clickLogout()}>ログアウト</button>
      <button onClick={() => clickUpdate()}>更新</button>
    </Container>
  );
};

export default Mypage;
