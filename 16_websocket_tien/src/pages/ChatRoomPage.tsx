import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showChat, setName } from "../redux/slices/chatSlice";
import { showMessage } from "../redux/slices/uxSlice";

const Container = styled.div`
	text-align: center;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 24px;
	margin-bottom: 10px;
`;

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MessageList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	max-height: 300px;
	overflow-y: auto;
`;

const Message = styled.li`
	margin: 5px 0;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const InputContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
`;

const Input = styled.input`
	width: 80%;
	padding: 5px;
`;

const Button = styled.button`
	background-color: lightblue;
	padding: 5px 10px;
`;
type Chat = {
	name: string;
	text: string;
	timestamp: string;
};
type ChatLog = Array<Chat>;

const socket: Socket = io("http://localhost:3443");

const ChatRoomPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);

	//ルーム名、ユーザー名
	// const [roomName, setRoomName] = useState(searchParams.get("room"));
	// const [userName, setUserName] = useState(searchParams.get("name"));
	const dispatch = useDispatch();
	const userName = searchParams.get("name");
	const roomName = searchParams.get("room");

	// const [message, setMessage] = useState("");
	const [chatLog, setChatLog] = useState<ChatLog>([]);
	const [text, setText] = useState<string>(""); //入力するテクスト
	const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
	const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
	// const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [room, setRoom] = useState<string>("");
	
	const joined = useSelector((state: any) => state.chat.joined);

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
		return () => {
			console.log("切断");
			socket.disconnect();
		};
	}, []);

	// const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setMessage(event.target.value);
	// };

	const sendMessage = () => {
		socket.emit(
			"createMessage",
			{ name: userName, room: roomName, text: text },
			() => {
				setText("");
			}
		);
	};
	const BackMessage = () => {
		// dispatch(showChat(false))
		navigate("/chathome")

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

	// const join = (event: any) => {
	// 	event.preventDefault();
	// 	socket.emit("join", { name: name, room }, () => {
	// 		dispatch(showChat(true));
	// 	});
	// };
console.log(joined);
	return (
		<Container>
			<Title>Chat Room: {roomName}</Title>
			{joined ? ( // Проверка, присоединился ли пользователь
				<ChatContainer>
					<MessageList>
						{chatLog.map((item: any, index) => (
							<div key={index}>
								<span>{item.name}</span>
								<span>：{item.text}</span>
								<span>{item.date}</span>
							</div>
						))}
					</MessageList>
					<InputContainer>
						<Input
							type="text"
							value={text}
							onChange={(event) => {
								setText(event.target.value);
							}}
							placeholder="Enter your message"
						/>
						<Button onClick={sendMessage}>Send</Button>
						<Button onClick={BackMessage}>Back</Button>
					</InputContainer>
				</ChatContainer>
			) : (
				<div>
					<p>Please join the chat room.</p>
				</div>
			)}
		</Container>
	);
};

export default ChatRoomPage;