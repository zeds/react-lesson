import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Container, NESTJS_URL, STRAPI_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
import styled from "styled-components";
import avatar from "../assets/people-circle.svg";
import { useForm } from "react-hook-form";
import { showMessage } from "../redux/slices/uxSlice";
import jwt_decode from "jwt-decode";
import { Input } from "../components/Input";
import { validation } from "../common/validation";

const Header = styled.div`
	text-align: center;
`;

const Blank = styled.div`
	position: absolute;
	width: 100px;
	height: 100px;
	background: white;
	pointer-events: none;
`;

const Avatar = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	/* display: flex;
	width: 100px;
	height: 100px;
	margin: 0 auto;
	justify-content: center;
	input {
		width: 100px;
		height: 100px;
		border: none;

		cursor: pointer;
	} */
	img {
		width: 150px;
		height: 150px;
		object-fit: cover;
		margin-bottom: -15px;
		border-radius: 5px;
	}
	label {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	input {
		display: none;
	}
	.icon {
		/* opacity: 0; */
	}
`;

const Frame = styled.div`
	max-width: 400px;
	margin: 0 auto;
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
`;

interface UpdateForm {
	name: string;
	avatar_url: string;
	introduction: string;
}

const Mypage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [image, setImage] = useState(avatar);
	const [userId, setUserId] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");

	const token = useSelector((state: RootState) => state.auth.jwt);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<UpdateForm>({
		mode: "onChange",
	}); // "onBlur"

	useEffect(() => {
		console.log("useEffect token=", token);

		if (!token) {
			navigate("/login");
			return;
		} else {
			let decoded: any = jwt_decode(token);
			console.log("exp=", decoded.exp);
			const d = new Date(0);
			d.setUTCSeconds(decoded.exp);
			console.log(d);
		}
	}, [token]);

	// 😺更新
	const { mutate } = useMutation({
		mutationFn: (newPost: UpdateForm) => {
			return axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		onSuccess: (data) => {
			dispatch(
				showMessage({
					show: true,
					animation: false,
					button: true,
					message: "更新しました",
				})
			);

			console.log("data=", data);
		},
		onError: (error: any) => {
			console.log("error=", error);
		},
	});

	// 😺取得
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
			const url = res.data.avatar_url;
			if (url) {
				setImage(`${STRAPI_URL}${url}`);
			}

			// react-hook-formのフィールドの値をリアルタイムに変更できる
			setValue("name", res.data.name);
			setValue("introduction", res.data.introduction);

			return res.data;
		} catch (error) {
			// JWTの有効期限切れなら、期限を表示する
			console.log("エラー");

			navigate("/login");

			return null;
		}
	};

	// 😺useQuery
	const queryData = useQuery({
		queryKey: ["getme"],
		queryFn: () => getMe(),
		refetchOnWindowFocus: false,
		cacheTime: 0,
	});

	if (queryData.isLoading) {
		return <div>Loading...</div>;
	}
	if (queryData.isError) {
		console.log("isError");
		navigate("/login");
	}

	const clickLogout = () => {
		// purge()関数でlocal storageは消されるが、sliceが更新されないので注意！
		dispatch(clear(""));

		navigate("/login");
	};

	//avatar画像を変更
	const clickAvatar = async (event: React.FocusEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log("file=", file);
		dispatch(
			showMessage({
				show: true,
				animation: true,
				button: false,
				message: "画像処理中。。。",
			})
		);
		if (file) {
			const formData = new FormData();
			formData.append("files", file);
			await axios
				.post(`${STRAPI_URL}/api/upload`, formData)
				.then((response) => {
					console.log("response=", response);
					setAvatarUrl(response.data[0].url);
					setImage(window.URL.createObjectURL(file));
					dispatch(
						showMessage({
							show: false,
						})
					);
				})
				.catch((error) => {
					console.log("error movie:", error);
				});
		}
	};

	//更新
	const onSubmit = (data: UpdateForm) => {
		console.log("onSubmit");
		console.log("data=", data);
		dispatch(
			showMessage({
				show: true,
				animation: true,
				button: true,
				message: "更新中。。。",
			})
		);

		//avatarが変更されている場合、data.avatar_urlを変更
		//変更されていない場合、元の値のまま更新
		if (avatarUrl.length) {
			data["avatar_url"] = avatarUrl;
		}

		mutate(data);
	};

	return (
		<Container>
			<Frame>
				<Header>
					<h1>マイページ</h1>
				</Header>
				<Avatar>
					<img src={image} alt="Preview" />
					<label htmlFor="fileInput">
						<Icon
							className="icon"
							icon="solar:camera-bold-duotone"
							style={{ fontSize: "30px", color: "red" }}
						/>
						<input type="file" id="fileInput" onChange={clickAvatar} />
					</label>
				</Avatar>
				<Grid>
					<div>username</div>
					<div>{queryData.data.username}</div>
					<div>email</div>
					<div>{queryData.data.email}</div>
				</Grid>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						name="name"
						label="お名前"
						placeholder="山田 太郎"
						errors={errors}
						register={register}
						validationSchema={validation[0]}
						required={true}
					/>
					<Input
						type="textarea"
						name="introduction"
						label="自己紹介"
						placeholder="メッセージを書いてください"
						errors={errors}
						register={register}
						validationSchema={validation[0]}
						required={false}
					/>
					<input type="submit" value="更新" />
				</form>
			</Frame>
			<button onClick={() => clickLogout()}>ログアウト</button>
		</Container>
	);
};

export default Mypage;
