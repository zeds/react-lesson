import { useState, useEffect, useRef, CSSProperties } from "react";
import io from "socket.io-client"; //default io は　socket.io　通信をする必要があるライブラリです。
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setName, showChat } from "../redux/slices/chatSlice";

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
const socket = io("http://localhost:3000");
// const socket = io("http://danang-alley.com:3443");

const Chat = () => {
	const [chatLog, setChatLog] = useState<ChatLog>([]); //今までのチャットデータ、サーバーの方、過去の履歴

	const [text, setText] = useState<string>(""); //入力するテクスト
	const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
	
	const joined = useSelector((state:any)=>state.chat.joined);
	const name = useSelector((state:any)=>state.chat.name);
	const dispatch = useDispatch();

	 //参加した時に、トゥルーになる、joinedは送信ボタンを押すと、
	//チャットの履歴が表示されるようになって来ます、joinedはfalseとお入力してください。のインプットファイルを表示される
	const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	
	useEffect(() => {
		let client:number = 0;
		//接続が完了したら、発火
		socket.on("connect", () => {
			client ++;
			console.log("接続ID : ", socket.id);
		});

		//切断
		// return () => {
		// 	console.log("切断");
		// 	socket.disconnect();
		// };
	}, []);

	useEffect(() => {
		console.log("text=", text);
		socket.emit("typing", { isTyping: true }); //入力テキストは変わると　EMITはサーバーにデータを送るコマンドISTYPINGはトゥルーというステータス

		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => { //タイムは２秒はたったら、関数を呼び出す、サーバーにデータを送るコマンドISTYPINGはfalseを設定されます　
			socket.emit("typing", { isTyping: false });	 // Nó gửi một thông điệp với dữ liệu { isTyping: true } đến máy chủ thông qua kết nối WebSocket.
		}, 2000);
	}, [text]);

	useEffect(() => {
		console.log("useEffectで登録サーバーから初期値を取得");

		socket.emit("findAllMessages", (chat: any) => {
			setChatLog(chat);
			console.log("chat受信", chat);
			// console.log("chat受信", chatLog);
		});

		//Khi máy chủ gửi một sự kiện "message" thông qua WebSocket,đoạn mã này được thực thi. 
		//Nó lắng nghe thông điệp được gửi từ máy chủ và thực hiện các hành động  
		//như hiển thị thông điệp trên giao diện người dùng và cập nhật danh sách tin nhắn (chatLog).

		socket.on("message", (message) => { //sau khi nhập text, bấm　送信ボタンと名前と入力値は
			//ユーザーインターフェイスにメッセージを表示し、メッセージリストを更新します

			console.log("message=", message);
			setChatLog((current) => [...current, message]); //currentでメッセージリストをもう一個追加する

			// console.log(current);
			console.log(chatLog);
		});

		socket.on("typing", ({ name, isTyping }) => { //socket.on 
			console.log("誰かが入力してます");
			console.log(name);
			if (isTyping) {
				console.log("typing");
				setTypingDisplay(true);
				setTypingName(name);
			} else {
				setTypingDisplay(false);
				setTypingName('');
			}
		});
	}, []);

	const sendMessage = () => {
		socket.emit("createMessage", { name: name, text: text }, (res:any) => {
			//TODO: clear name, text
			setText("");
			console.log(res);
		});
	};

	const backMessage = () => {
		dispatch(showChat(false));
	};
//Khi máy chủ gửi một sự kiện "join" thông qua WebSocket,đoạn mã này được thực thi. 
	const join = (event: any) => {
		//submitボタンを押すときに、inputの値はサーバーに送って、browserをリロード
		event.preventDefault();
		socket.emit("join", { name: name }, (res:any) => {
			
			// setJoined(true);
			console.log(res);
			dispatch(showChat(true));
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
									<span>：{item.date}</span>
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
					<div style={{display: "flex"}}>
						<button onClick={sendMessage}> send </button>
						<button onClick={backMessage}> back </button>
					</div>
					{typingDisplay ? (
					<div>
				<p>{typingName}</p>
							<PulseLoader
								// color={color}
								// loading={loading}
								cssOverride={override}
								size={10}
								aria-label="Loading Spinner"
								data-testid="loader"
								/>
								</div>
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
							dispatch(setName(event.target.value));
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
