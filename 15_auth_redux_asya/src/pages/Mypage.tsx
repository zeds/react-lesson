import { useEffect } from "react";
import { Container, NESTJS_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
import styled from "styled-components"
import avatar from "../assets/avatar.svg"
import { Input } from "../components/Input"
import { validation } from "../common/validation";
import { useForm } from 'react-hook-form';


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
`

const Grid = styled.div`
	max-width: 800px;
	display: grid;
	grid-template-columns: 100px 1fr;
	font-size: 2rem;
	padding: 15px;
	margin: 0 auto;
	/* background: red; */
`;

interface EditForm {
	username: string;
	name: string;
	email: string;
}

const Mypage = () => {
	// const [isOnline, setIsOnline] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditForm>({
		mode: "onChange",
	}); // "onBlur"

	const isOnline: boolean = navigator.onLine;
	if (isOnline === true) {
		console.log("オンラインです");
	} else {
		console.log("オフラインです");
	}

	const token = useSelector((state: RootState) => state.auth.jwt);
	console.log("token=", token);

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
				<form>
					<div>username</div>
					<div>{data.username}</div>
					<div>name</div>
					<div>
						<Input
							type="text"
							name="name"
							label="お名前"
							placeholder="aaaa bbbb"
							errors={errors}
							register={register}
							validationSchema={validation[0]}
							required={false}
						></Input>
					</div>						
					<div>email</div>
					<div>{data.email}</div>						
				</form>
				{/* <div>{JSON.stringify(data)}</div> */}
			</Grid>			
			<button onClick={() => clickLogout()}>ログアウト</button>			
		</Container>
	);
};

export default Mypage;