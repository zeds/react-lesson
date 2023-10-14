import { useEffect } from "react";
import { Container, STRAPI_URL } from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clear } from "../redux/slices/authSlice";

const Mypage = () => {
	const [isOnline, setIsOnline] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isOnline = navigator.onLine;

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
			const res = await axios.get(`${STRAPI_URL}/api/users/me`, {
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
			マイページ
			<div>
				{JSON.stringify(data)}
				<button onClick={() => clickLogout()}>ログアウト</button>
			</div>
		</Container>
	);
};

export default Mypage;
