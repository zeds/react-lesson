import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, NESTJS_URL } from "../GlobalStyle";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";

const override: CSSProperties = {
	display: "block",
	position: "absolute",
	margin: "0 auto",
	borderColor: "red",
};

const Form = styled.div`
	width: 100%;
	height: 100vh;
	background: skyblue;
	font-size: 3rem;
`;

const Users = () => {
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#000000");

	const token = useSelector((state: RootState) => state.auth.jwt);
	console.log("token=", token);

	// 😺CRUDのRead
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			console.log("url=", `${NESTJS_URL}/users`);
			// const response = await fetch(`${NESTJS_URL}/users`, {
			// 	headers: {
			// 		Authorization: `Bearer ${token}`,
			// 	},
			// });
			// fetchだとデータが取得できなかった。2023-10-15
			const response = await axios.get(`${NESTJS_URL}/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("response=", response);

			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("指定したURLからデータを取得できませんでした");
			}
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
				{data.result.map((item: any, index: number) => (
					<div key={index}>
						{item.username} {item.email}
					</div>
				))}
			</Form>
		</Container>
	);
};

export default Users;