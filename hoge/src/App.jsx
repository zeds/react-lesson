import "./App.css";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
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
	const postsQuery = useQuery({
		queryKey: ["comments"],
		queryFn: () =>
			fetch(`https://lusty.asia:1443/api/mercari-comments`).then((res) =>
				res.json()
			),
	});
	if (postsQuery.isLoading) {
		return <h1>Loading...</h1>;
	}

	const clickEdit = () => {
		console.log("Edit");
	};
	const clickDelete = () => {
		console.log("Delete");
	};

	return (
		<Container>
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
