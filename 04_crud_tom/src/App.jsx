import { useQuery, useMutation } from "@tanstack/react-query";

import styled from "styled-components";
import "./App.css";

const POSTS = [
	{ id: 1, title: "Post 1" },
	{ id: 2, title: "Post 2" },
];

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 10px;
	background: gray;
	height: 500px;
`;

function App() {
	const postsQuery = useQuery({
		queryKey: ["posts"],
		queryFn: () => wait(1000).then(() => [...POSTS]),
		// queryFn: () => Promise.reject("Error Message"),
	});

	const newPostMutation = useMutation({
		mutationFn: (title) => {
			return wait(100).then(() =>
				POSTS.push({ id: crypto.randomUUID(), title })
			);
		},
	});
	if (postsQuery.isLoading) {
		return <h1>Loading...</h1>;
	}
	if (postsQuery.isError) {
		return <pre>{JSON.stringify(postsQuery.error)}</pre>;
	}

	return (
		<div>
			{postsQuery.data.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
			<button onClick={() => newPostMutation.mutate("new post")}>
				Add New
			</button>
		</div>
	);
}

function wait(duration) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
