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

const RoomButton = styled.button`
  margin: 5px;
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
        <Link to={`/chat/roomA`}>
          <RoomButton onClick={() => setSelectedRoom("roomA")}>Room A</RoomButton>
        </Link>
        <Link to={`/chat/roomB`}>
          <RoomButton onClick={() => setSelectedRoom("roomB")}>Room B</RoomButton>
        </Link>
        <Link to={`/chat/roomC`}>
          <RoomButton onClick={() => setSelectedRoom("roomC")}>Room C</RoomButton>
        </Link>
      </div>
    </Container>
  );
};

export default ChatHomePage;
