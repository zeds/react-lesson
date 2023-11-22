import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "./UserContext";
import axios from "axios";

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
	const [createRoom, setCreateRoom ] = useState<boolean>(false);
	const { userName, setUserName } = useUser();
	const [room, setRoom] = useState<string>("")
	const [logRoom, setLogRoom] = useState<{id:string, name:string}[]>([])
	// const [selectedRoom, setSelectedRoom] = useState("");
	const handleCreateRoom = async() =>{
		const newRoom:{data:{id:string, name:string}} = await axios.post('http://localhost:3000/room',{name:room})
		console.log(newRoom)
		setLogRoom(rooms=>[...rooms, newRoom.data])
		setRoom("");
	}
useEffect(()=>{
	axios.get('http://localhost:3000/room')
	.then((res)=>{
		setLogRoom(res.data)
		console.log(logRoom)
	})
},[]) 
	return (
		<Container>
			<Title>Welcome to the Chat Page</Title>
			<Label>Enter your name:</Label>
			<Input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
			<br />
			<br />
			<button onClick={()=>setCreateRoom(!createRoom)}>+ new </button>
			<div>
				{createRoom && 
				(<div><input value={room} onChange={(e)=>setRoom(e.target.value)} type="text"></input>
				<button onClick={handleCreateRoom}>add</button>
				</div>)}
				
			</div>
			<div>
				<p>Select a room:</p>
				{logRoom.map(r=>{
					return (
						<Link to={`/chat`} state={{room:r, userName,logRoom}}>
					<RoomButton>
						{r.name}
					</RoomButton>
				</Link>
					)
				})}
				
			</div>
		</Container>
	);
};

export default ChatHomePage;
