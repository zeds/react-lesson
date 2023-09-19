import { useRef } from "react";
import "./App.css";
import axios from "axios";
import { styled } from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import edit from "./assets/edit.svg";
import trush from "./assets/trush.svg";

const Container = styled.div`
	max-width: 1024px;
	background: white;
	font-size: 2rem;
	margin: 0 auto;
	padding: 10px;
`;

const Card = styled.div`
	display: flex;
	width: 98%;
	border: 1px solid black;
	padding: 10px;
	margin: 10px auto;
	justify-content: space-between;
	align-items: center;

	.operation {
		display: flex;
		gap: 10px;
		button {
			border: none;
			padding: 10px;
			border-radius: 4px;
		}
		button:hover {
			cursor: pointer;
			opacity: 0.5;
		}
	}
`;

function App() {
	const queryClient = useQueryClient();
	const refName = useRef();
	const refComment = useRef();

	const mutationCreate = useMutation({
		mutationFn: (newComment) => {
			return axios.post(
				"https://lusty.asia:1443/api/mercari-comments",
				newComment
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const postsQuery = useQuery(
		["comments"],
		() =>
			fetch("https://lusty.asia:1443/api/mercari-comments").then((res) =>
				res.json()
			),
		{
			refetchInterval: 2000,
		}
	);

	if (postsQuery.isLoading) {
		return <h1>Loading...</h1>;
	}

	const clickEdit = () => {
		console.log("Edit");
	};
	const clickDelete = () => {
		console.log("Delete");
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(refName.current.value);
		console.log(refComment.current.value);
		mutationCreate.mutate({
			data: {
				name: refName.current.value,
				comment: refComment.current.value,
			},
		});
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				名前：<input ref={refName} type="text"></input>
				コメント：<input ref={refComment} type="text"></input>
				<button type="submit">投稿</button>
			</form>

			{postsQuery.data.data.map((item, index) => (
				<Card key={index}>
					<div>
						<div>{item.attributes.name}</div>
						<div>{item.attributes.comment}</div>
					</div>
					<div className="operation">
						<button onClick={() => clickEdit()}>
							<img src={edit} alt="" />
						</button>
						<button onClick={() => clickDelete()}>
							<img src={trush} alt="" />
						</button>
					</div>
				</Card>
			))}
		</Container>
	);
}

export default App;
