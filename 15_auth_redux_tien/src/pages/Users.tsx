import { Container, NESTJS_URL } from "../GlobalStyle";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled, { CSSProperties } from "styled-components";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";

const Form = styled.div`
	width: 100%;
	height: 100vh;
	background: skyblue;
	font-size: 3rem;
`;
const override: CSSProperties = {
	display: "block",
	position: "absolute",
	margin: "0 auto",
	borderColor: "red",
};
const Users = () => {
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState ("#000000");

	let navigate = useNavigate()
	const token = useSelector((state:RootState) => state.auth.jwt);
	// console.log(token);
	// 😺CRUDのRead
	useEffect(() => {
		if (!token) {
			navigate("/login");
		  return;
		}
	  }, [token]);

	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await axios.get(`${NESTJS_URL}/users`,{
				headers:{
					Authorization: `Bearer ${token}`,
				}
			});
			// console.log(response.data);
			// console.log(data);
			if (!response) {
				throw new Error("指定したURLからデータを取得できませんでした");
			}
			return response.data.result;
		},
		retry: false,
		// refetchOnWindowFocus: false
	});
	
	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (isError) {
		console.log("isError = ", error);
		return <div>ばか</div>;
	}
	
	// console.log(data);
	if (isSuccess) {
		// setLoading(false);
	}
	return (
		<Container>
			<BeatLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<Form>
				<div>ユーザー名</div>
				{data.map((item: any, index: number) => (
					<div key={index}>
						{item.username} {item.email}
					</div>
				))}
			</Form>
		</Container>
	);
};

export default Users;
