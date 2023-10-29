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
`;

type Chat = {
	name: string;
	text: string;
};

type ChatLog = Array<Chat>;

//接続
// const socket = io("http://localhost:3443");
const socket = io("http://danang-alley.com:3443");
const Chat = () => {
	const [chatLog, setChatLog] = useState<ChatLog>([]);
	const [name, setName] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [joined, setJoined] = useState(false);
	const [typingDisplay, setTypingDisplay] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		//接続が完了したら、発火
		socket.on("connect", () => {
			console.log("接続ID : ", socket.id);
		});

		//切断
		return () => {
			console.log("切断");
			socket.disconnect();
		};
	}, []);

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

		socket.emit("findAllMessages", (chat: any) => {
			setChatLog(chat);
			console.log("chat受信", chat);
			console.log("chat受信", chatLog);
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
	}, []);

	const sendMessage = () => {
		socket.emit("createMessage", { name: name, text: text }, () => {
			//TODO: clear name, text
			setText("");
		});
	};

	const join = (event: any) => {
		event.preventDefault();
		socket.emit("join", { name: name }, () => {
			setJoined(true);
		});
	};

	//現在時刻取得
	// const getNow = useCallback((): string => {
	// 	const datetime = new Date();
	// 	return `${datetime.getFullYear()}/${
	// 		datetime.getMonth() + 1
	// 	}/${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
	// }, []);

	return (
		<Frame>
			{joined ? (
				<div>
					<span>お名前：</span>
					<span>{name}</span>
					<br />

					<div className="chat_container">
						<div className="message_container">
							{chatLog.map((item: any, index) => (
								<div key={index}>
									<span>{item.name}</span>
									<span>：{item.text}</span>
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
					<div>
						<button onClick={sendMessage}> send </button>
					</div>
					{typingDisplay ? (
						<PulseLoader
							// color={color}
							// loading={loading}
							cssOverride={override}
							size={50}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					) : (
						<div></div>
					)}
				</div>
			) : (
				<form onSubmit={(event) => join(event)}>
					<label>What's your name?</label>
					<input
						type="text"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
						placeholder="お名前"
					/>

					<button type="submit">送信</button>
				</form>
			)}
		</Frame>
	);
};

export default Chat;
