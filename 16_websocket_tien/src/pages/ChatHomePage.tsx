import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "./UserContext";

const Container = styled.div`
	text-align: center;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 24px;
	margin-bottom: 10px;
`;

const Label = styled.label`
	display: block;
	margin: 10px 0;
`;

const Input = styled.input`
	width: 100%;
	padding: 5px;
`;

export const RoomButton = styled.button`
	display: flex;
	margin: 20px;
	font-size: 2rem;
	cursor: pointer;
`;

const ChatHomePage = () => {
	const { userName, setUserName } = useUser();
	const [selectedRoom, setSelectedRoom] = useState("");

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(event.target.value);
	};

	return (
		<Container>
			<Title>Welcome to the Chat Page</Title>
			<Label>Enter your name:</Label>
			<Input type="text" value={userName} onChange={handleNameChange} />
			<div>
				<p>Select a room:</p>
				<Link to={`/chat?room=room-1&name=${userName}`}>
					<RoomButton onClick={() => setSelectedRoom("roomA")}>
						Room A
					</RoomButton>
				</Link>
				<Link to={`/chat?room=room-2&name=${userName}`}>
					<RoomButton onClick={() => setSelectedRoom("roomB")}>
						Room B
					</RoomButton>
				</Link>
				<Link to={`/chat?room=room-3&name=${userName}`}>
					<RoomButton onClick={() => setSelectedRoom("roomC")}>
						Room C
					</RoomButton>
				</Link>
			</div>
		</Container>
	);
};

export default ChatHomePage;
