import { Container, STRAPI_URL } from "../GlobalStyle";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

const Form = styled.div`
	width: 100%;
	height: 100vh;
	background: skyblue;
	font-size: 3rem;
`;

const Users = () => {
	const getUsers = async (text: any) => {
		console.log("text=", text);
		const res = await axios.get(`${STRAPI_URL}/api/users`);
		console.log(res.data);
		return res.data;
	};

	// 😺CRUDのRead
	const { isLoading, error, data } = useQuery(["users"], () =>
		getUsers("aiueo")
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<Form>
				<div>ユーザー名</div>
				{data.map((item: any, index: number) => (
					<div key={index}>{item.username}</div>
				))}
			</Form>
		</Container>
	);
};

export default Users;
