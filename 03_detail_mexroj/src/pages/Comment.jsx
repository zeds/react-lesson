import React from "react";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";

const NeContainer = styled.div`
	max-width: 400px;
	background: red;
	margin: 0 auto;
`;

const Comment = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["Comments"],
		queryFn: () =>
			fetch(`https://lusty.asia:1443/api/mercari-comments`).then((res) =>
				res.json()
			),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error</p>;
	}

	const content = data.data.map((item) => {
		console.log(item);
	});

	return (
		<NeContainer>
			<div>Comment</div>
			<div>Comment</div>
			<div>Comment</div>
			<div>Comment</div>
			<div>Comment</div>
			<div>Comment</div>
			<div>Comment</div>
		</NeContainer>
	);
};

export default Comment;
