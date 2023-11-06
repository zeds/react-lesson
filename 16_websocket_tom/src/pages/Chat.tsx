import { useState, useEffect, useRef, CSSProperties } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";

const override: CSSProperties = {
	display: "block",
	position: "absolute",
	margin: "0 auto",
	borderColor: "red",
};

const Frame = styled.div`
	width: 100%;
	height: 100vh;
	background: lightblue;
	padding-top: 64px;
	font-size: 20px;

	input {
		width: 200px;
		padding: 5px;
	}
	button {
		width: 100px;
		height: 50px;
		margin-left: 100px;
	}
	.rooms {
		margin-top: 20px;
		button {
			width: 50px;
			height: 30px;
		}
	}
`;

type Chat = {
	name: string;
	text: string;
};

type ChatLog = Array<Chat>;

//接続
const socket = io("http://localhost:3000");
// const socket = io("https://linkstaff.online:3000");
// const socket = io("http://danang-alley.com:3443");
const Chat = () => {
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState("");

	const [chatLog, setChatLog] = useState<ChatLog>([]);
	const [name, setName] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [joined, setJoined] = useState(false);
	const [typingDisplay, setTypingDisplay] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	//ルーム名が変更されたら、呼び出される
	useEffect(() => {
		console.log("room名：", room);
		//参加しているルームのメッセージを取得
		socket.emit("findAllMessages", { room: room }, (chat: any) => {
			setChatLog(chat);
			console.log("chat受信", chat);
			console.log("chat受信", chatLog);
		});
	}, [room]);

	useEffect(() => {
		console.log("text=", text);
		socket.emit("typing", { isTyping: true });

		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			socket.emit("typing", { isTyping: false });
		}, 2000);
	}, [text]);

	useEffect(() => {
		console.log("useEffectで登録サーバーから初期値を取得");
		socket.recovered;

		//接続が完了したら、発火
		socket.on("connect", () => {
			console.log("接続ID : ", socket.id);
		});

		//room一覧を取得
		socket.emit("rooms", (data: any) => {
			console.log("rooms=", data);
			setRooms(data);
		});

		socket.on("message", (message) => {
			console.log("message=", message);
			setChatLog((current) => [...current, message]);
			console.log(chatLog);
		});

		socket.on("typing", ({ name, isTyping }) => {
			console.log("誰かが入力してます");
			if (isTyping) {
				console.log("typing");
				setTypingDisplay(true);
			} else {
				setTypingDisplay(false);
			}
		});

		//切断
		return () => {
			console.log("切断");
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}

			socket.disconnect();
		};
	}, []);

	const sendMessage = () => {
		socket.emit(
			"createMessage",
			{ name: name, room: room, text: text },
			() => {
				//TODO: clear name, text
				setText("");
			}
		);
	};

	//現在時刻取得
	// const getNow = useCallback((): string => {
	// 	const datetime = new Date();
	// 	return `${datetime.getFullYear()}/${
	// 		datetime.getMonth() + 1
	// 	}/${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
	// }, []);

	const joinRoom = (item: string) => {
		console.log(item + "に参加しました");
		setRoom(item);
		socket.emit("join", { room: item, name: name }, (ret: any) => {
			console.log("join response=", ret);
			setJoined(true);
		});
	};

	return (
		<Frame>
			{joined ? (
				<div>
					<div>参加している部屋：{room}</div>
					<span>お名前：</span>
					<span>{name}</span>
					<br />

					<div className="chat_container">
						<div className="message_container">
							{chatLog.map((item: any, index) => (
								<div key={index}>
									<span>{item.name}</span>
									<span>：{item.text}</span>
									<span>{item.date}</span>
								</div>
							))}
						</div>
					</div>
					<div>送信内容</div>
					<div>
						<span>メッセージ</span>
						<input
							type="text"
							value={text}
							onChange={(event) => {
								setText(event.target.value);
							}}
							placeholder="メッセージ"
						/>
					</div>
					<br />
					<div className="sendButton">
						<button onClick={sendMessage}> 送信 </button>
					</div>
					{typingDisplay ? (
						<PulseLoader
							cssOverride={override}
							size={20}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					) : (
						<div>入力できます！</div>
					)}
				</div>
			) : (
				<div>
					<label>What's your name?</label>
					<input
						type="text"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
						placeholder="お名前"
					/>
					<div className="rooms">
						{rooms.map((item, index) => (
							<button key={index} onClick={() => joinRoom(item)}>
								{item}
							</button>
						))}
					</div>
				</div>
			)}
		</Frame>
	);
};

export default Chat;
