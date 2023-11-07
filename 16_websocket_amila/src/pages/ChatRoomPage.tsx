import React, { useState, useEffect,useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showChat, setName } from "../redux/slices/chatSlice";

const Container = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: scroll;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;
  margin-left: 10px;
`;

const Button = styled.button`
  background-color: lightblue;
  margin: 10px;
  background: skyblue;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

type Chat = {
	name: string;
	text: string;
	timestamp: string;
};
type ChatLog = Array<Chat>;

const socket: Socket = io("http://localhost:3443");

const ChatRoomPage = () => {
	const messageListRef = useRef<HTMLUListElement | null>(null);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	//ルーム名、ユーザー名
	const [roomName, setRoomName] = useState(searchParams.get("room"));
	const [userName, setUserName] = useState(searchParams.get("name"));

	const [message, setMessage] = useState("");
	const [chatLog, setChatLog] = useState<ChatLog>([]);
	const [text, setText] = useState<string>(""); //入力するテクスト
	const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
	const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
	// const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const joined = useSelector((state: any) => state.chat.joined);
	const dispatch = useDispatch();
	const [room, setRoom] = useState<string>("");

	useEffect(() => {
		//接続が完了したら、発火
		socket.on("connect", () => {
			console.log("接続ID : ", socket.id);
			// console.log("sockett : ", socket);
		});

		socket.emit("join", { name: userName, room: roomName }, () => {
			dispatch(showChat(true));
		});

		//切断
		// return () => {
		// 	console.log("切断");
		// 	socket.disconnect();
		// };
	}, []);

	const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const sendMessage = () => {
		const timestamp = moment().format(" YYYY-MM-DD HH:mm:ss"); 
		socket.emit(
			"createMessage",
			{ name: userName, room: roomName, text: text, timestamp },
			() => {
				setText("");
			}
		);
	};

	useEffect(() => {
		console.log("useEffectで登録サーバーから初期値を取得");

		// socket.emit("findAllMessages", (chat: any) => {
		socket.emit("findAllMessages", { room: roomName }, (chat: any) => {
			setChatLog(chat);
			console.log("chat受信", chat);
			console.log("chat受信", chatLog);
		});

		socket.on("message", (message) => {
			console.log("message=", message);
			setChatLog((current) => [...current, message]); //currentでメッセージリストをもう一個追加する

			if (messageListRef.current) {
				messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
			  }
		
			// console.log(current);
			console.log(chatLog);
		});
		socket.on("typing", ({ name, isTyping }) => {
			//socket.on
			console.log("誰かが入力してます");
			console.log(name);
			if (isTyping) {
				console.log("typing");
				setTypingDisplay(true);
				setTypingName(name);
			} else {
				setTypingDisplay(false);
				setTypingName("");
			}
		});
	}, []);

	const join = (event: any) => {
		event.preventDefault();
		socket.emit("join", { name: userName, room }, () => {
			dispatch(showChat(true));
		});
	};

	return (
		<>
		<Container>
			<Title>Chat Room: {roomName}</Title>
			{joined ? ( 
				<ChatContainer>
					<MessageList>
						{chatLog.map((item: any, index) => (
							<div key={index}>
								<span>{item.name}</span>
								<span>：{item.text}</span>
								<span>{item.timestamp}</span>
							</div>
						))}
					</MessageList>
					{/* <Footer>
						<Input
							type="text"
							value={text}
							onChange={(event) => {
								setText(event.target.value);
							}}
							placeholder="Enter your message"
						/>
						<Button onClick={sendMessage}>Send</Button>
					</Footer> */}
				</ChatContainer>
			) : (
				<div>
					<p>Please join the chat room.</p>
				</div>
			)}
			{/* <Footer>
						<Input
							type="text"
							value={text}
							onChange={(event) => {
								setText(event.target.value);
							}}
							placeholder="Enter your message"
						/>
						<Button onClick={sendMessage}>Send</Button>
					</Footer> */}
		</Container>
		<Footer>
		<Input
			type="text"
			value={text}
			onChange={(event) => {
				setText(event.target.value);
			}}
			placeholder="Enter your message"
		/>
		<Button onClick={sendMessage}>Send</Button>
	</Footer>
	</>
		
		
	);
};

export default ChatRoomPage;
