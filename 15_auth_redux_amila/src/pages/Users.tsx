import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, STRAPI_URL } from "../GlobalStyle";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

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

	// 😺CRUDのRead
	const { isLoading, isError, isSuccess, data, error } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await fetch(`${STRAPI_URL}/api/users`);
			console.log(response);
			if (!response.ok) {
				throw new Error("指定したURLからデータを取得できませんでした");
			}
			return response.json();
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
