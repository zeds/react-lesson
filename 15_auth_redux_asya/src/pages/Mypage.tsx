import { useEffect, useRef, useState } from "react";
import { validation } from "../common/validation";
import { Container, NESTJS_URL, STRAPI_URL } from "../GlobalStyle";
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
	width: 100px;
	margin: 0 auto;
	justify-content: center;
	input {
		width: 100px;
		height: 100px;
		cursor: pointer;
	}
	img {
		position: absolute;
		width: 100px;
		height: 100px;
		background: white;

		/* クリックを無効化 */
		pointer-events: none;
		cursor: pointer;
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

	input {
		height: 35px;
		padding: 5px;
	}

	textarea {
		height: 100px;
		padding: 5px;
	}
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
	const hiddenFileInput = useRef(null);
	const [image, setImage] = useState(avatar);

	const [avatarUrl, setAvatarUrl] = useState("");
	const [userId, setUserId] = useState("");
	const [name, setName] = useState("");
	const [introduction, setIntroduction] = useState("あいうえお");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state: RootState) => state.auth.jwt);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditForm>({
		mode: "onChange",
	}); // "onBlur"

	// 😺更新
	const patchData = useMutation({
		mutationFn: async (newPost: UpdateForm) => {
			return await axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		onSuccess: (data) => {
			console.log("data=", data);
		},
		onError: (error: any) => {
			console.log("error=", error);
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

			console.log("data=", JSON.stringify(res.data));
			setUserId(res.data.id);
			setName(res.data.name);
			const url = res.data.avatar_url;
			console.log("url=", url);
			setImage(`${STRAPI_URL}${url}`);
			setIntroduction(res.data.introduction);

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
			avatar_url: avatarUrl,
			introduction: introduction,
		};
		patchData.mutate(data);
		console.log("name=", name);
	};

	const clickAvatar = (e: any) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("files", file);
		axios
			.post(`${STRAPI_URL}/api/upload`, formData)
			.then((response) => {
				console.log("response=", response);
				setAvatarUrl(response.data[0].url);
			})
			.catch((error) => {
				console.log("error movie:", error);
			});

		setImage(window.URL.createObjectURL(file));
	};

	return (
		<Container>
			<Header>
				<h1>マイページ</h1>
				{avatarUrl}
			</Header>
			<Avatar onClick={clickAvatar}>
				<img src={image} alt="avatar" />
				<input
					type="file"
					accept="image/*"
					ref={hiddenFileInput}
					onChange={clickAvatar}
				/>
			</Avatar>

			<Grid>
				<div>id</div>
				<div>{data.id}</div>
				<div>username</div>
				<div>{data.username}</div>
				<div>email</div>
				<div>{data.email}</div>
				<div>name</div>
				<div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						// validationSchema={validation[1]}
						// required={false}
					></input>
				</div>
				<div>自己紹介</div>
				<textarea
					value={introduction}
					onChange={(e) => setIntroduction(e.target.value)}
				></textarea>
			</Grid>
			<button onClick={() => clickLogout()}>ログアウト</button>
			<button onClick={() => clickUpdate()}>更新</button>
		</Container>
	);
};

export default Mypage;