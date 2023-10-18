import { useEffect } from "react";
import { Container, NESTJS_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";
import  { styled } from "styled-components"
import hito from "../assets/hito.svg"
// import { Input } from "../components/Input";
import camera from "../assets/camera.svg"




const Header = styled.div`
	width: 800px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
`
const Avatar = styled.div`
	display: flex;
	width: 800px;
	margin: 0 auto;
	justify-content:center;
	img {
	width: 50px;
}
`
const Camera = styled.div`
	width: 20px;
	display: flex;
	margin: 0 auto;
	justify-content: center;
`

const Grid = styled.div`
	max-width: 800px;
	display: grid;
	grid-template-columns: 100px 1fr;
	font-size: 2rem;
	padding: 15px;
	margin: 0 auto;
	line-height: 3rem;
	gap: 10px;
`

const Mypage = () => {
	// const [isOnline, setIsOnline] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			<h1>マイページ</h1></Header>
		  <Avatar><img src={hito} alt="" /></Avatar>
		  <Camera><img src={camera} alt="" /></Camera>

		  <Grid>
			<div>id</div>
			<div>{data.id}</div>
			<div>username</div>
			<div>{data.username}</div> 
			<div>name</div>
			<div>{data.name}</div> 
			<div>email</div>
			<div>{data.email}</div> 
			{/* <div>
				<Input type=""/>
			</div> */}
		  </Grid>
		  <div>
			{/* {JSON.stringify(data)} */}
			<button onClick={() => clickLogout()}>ログアウト</button>
		  </div>
		</Container>
	  );
	}

export default Mypage
