import { useEffect, useRef, useState } from "react";
import { validation } from "../common/validation";
import { Container, NESTJS_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear, userLoginSuccess } from "../redux/slices/authSlice";
import styled from "styled-components";
import avatar from "../assets/people-circle.svg";
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
	margin: 0 auto;
	justify-content: center;
	img {
		width: 100px;
	}
`;

const Grid = styled.div`
	max-width: 800px;
	display: grid;
	grid-template-columns: 150px 1fr;
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

	// const [isOnline, setIsOnline] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state: RootState) => state.auth.jwt);
	console.log("token=", token);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditForm>({
		mode: "onChange",
	}); // "onBlur"

	const postData = useMutation({
		mutationFn: async (newPost: UpdateForm) => {
			return await axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return axios.post(`${NESTJS_URL}/auth/register`, newPost);
		},
		onSuccess: (data) => {
			console.log("success");
		},
		onError: (error: any) => {
			console.log("error");
		},
	});

	useEffect(() => {
		console.log("useEffect token=", token);
		if (!token) {
			navigate("/login");
			return;
		}
	}, [token]);

	const getMe = async () => {
		console.log("getMe");

		if (!token) {
			navigate("/login");
			return null;
		}

		//tokenが期限切れの場合は、ここでログアウトする
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

	// 😺CRUDのRead
	const { isLoading, isError, data } = useQuery({
		queryKey: ["getme"],
		queryFn: () => getMe(),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		console.log("isError");
		navigate("/login");
	}

	const clickLogout = () => {
		// purgeしてlocal storageが消えても、sliceが更新されないので注意！
		dispatch(clear(""));

		navigate("/login");
	};

	const clickUpdate = () => {
		dispatch(showMessage(true));
		let data = {
			name: name,
		};
		postData.mutate(data);
		console.log("name=", name);
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
					></input>
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
