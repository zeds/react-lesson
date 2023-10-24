import { useEffect, useRef, useState } from "react";
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

const Frame = styled.div`
	max-width: 400px;
	background: red;
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

	textarea {
		height: 100px;
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

	const hiddenFileInput = useRef(null);

	const [image, setImage] = useState(avatar);
	const [userId, setUserId] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");

	const token = useSelector((state: RootState) => state.auth.jwt);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
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
	const patchData = useMutation({
		mutationFn: async (newPost: UpdateForm) => {
			return await axios.patch(`${NESTJS_URL}/users/${userId}`, newPost, {
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
			const url = res.data.avatar_url;
			console.log("url=", url);
			setImage(`${STRAPI_URL}${url}`);

			// react-hook-formのフィールドの値をリアルタイムに変更できる
			setValue("name", res.data.name);
			setValue("introduction", res.data.introduction);

			// setInitialData((prevData) => ({
			// 	...prevData,
			// 	name: res.data.name,
			// 	introduction: res.data.introduction,
			// 	avatar_url: res.data.avatar_url,
			// }));
			// console.log("initialData=", initialData); //この時点では変更は反映されていない

			return res.data;
		} catch (error) {
			// JWTの有効期限切れなら、期限を表示する
			console.log("エラー");

			navigate("/login");

			return null;
		}
	};

	// 😺CRUDのRead
	const { isLoading, isError, data } = useQuery({
		queryKey: ["getme"],
		queryFn: () => getMe(),
		refetchOnWindowFocus: false,
		cacheTime: 0,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		console.log("isError");
		navigate("/login");
	}

	const clickLogout = () => {
		// purge()関数でlocal storageは消されるが、sliceが更新されないので注意！
		dispatch(clear(""));

		navigate("/login");
	};

	const clickAvatar = async (e: any) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("files", file);
		dispatch(
			showMessage({
				show: true,
				animation: true,
				button: false,
				message: "画像処理中。。。",
			})
		);

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
	};

	const onSubmit = (data: UpdateForm) => {
		dispatch(
			showMessage({
				show: true,
				animation: true,
				button: true,
				message: "更新中。。。",
			})
		);
		console.log("MyPage data=", data);
	};
	// 更新
	const clickUpdate = () => {
		let obj = {
			name: getValues("name"),
			introduction: getValues("introduction"),
			avatar_url: avatarUrl,
		};

		patchData.mutate(obj);
	};

	return (
		<Container>
			<Header>
				<h1>マイページ</h1>
			</Header>
			<Avatar onClick={() => clickAvatar}>
				<img src={image} alt="avatar" />
				<input
					type="file"
					accept="image/*"
					ref={hiddenFileInput}
					onChange={clickAvatar}
				/>
			</Avatar>

			<Frame>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>id</div>
					<div>{data.id}</div>
					<div>username</div>
					<div>{data.username}</div>
					<div>email</div>
					<div>{data.email}</div>
					<div>name</div>
					{data.name}
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
					<div>自己紹介</div>
					<textarea {...register("introduction", validation[3])} />
					<input type="submit" value="更新" />
				</form>
			</Frame>
			<button onClick={() => clickLogout()}>ログアウト</button>
		</Container>
	);
};

export default Mypage;
