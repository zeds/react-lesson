import { useState, useEffect, useRef, CSSProperties } from "react";
import io from "socket.io-client"; 
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { showChat, setName } from "../redux/slices/chatSlice";
import moment from "moment";

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
  timestamp: string;
};

type ChatLog = Array<Chat>;

//接続
const socket = io("http://localhost:3443");
// const socket = io("http://danang-alley.com:3443");

const Chat = () => {
	const [chatLog, setChatLog] = useState<ChatLog>([]); //今までのチャットデータ、サーバーの方、過去の履歴
	const [name, setName] = useState<string>(""); // userの名前
	const [text, setText] = useState<string>(""); //入力するテクスト
	const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
  const [room, setRoom] = useState<string>("");
	
	const joined = useSelector((state:any)=>state.chat.joined);
	const dispatch = useDispatch();
	// const [joined, setJoined] = useState(false);
	 //参加した時に、トゥルーになる、joinedは送信ボタンを押すと、
	//チャットの履歴が表示されるようになって来ます、joinedはfalseとお入力してください。のインプットファイルを表示される
	const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	
	useEffect(() => {
		//接続が完了したら、発火
		socket.on("connect", () => {
			console.log("接続ID : ", socket.id);
			// console.log("sockett : ", socket);
		});

		//切断
		return () => {
			console.log("切断");
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log("text=", text);
		socket.emit("typing", { isTyping: true }); //入力テキストは変わると　EMITはサーバーにデータを送るコマンドISTYPINGはトゥルーというステータス

		if (timerRef.current) {
			window.clearTimeout(timerRef.current); //проверяет и отменяет предыдущий таймер
		}

		timerRef.current = setTimeout(() => { //タイムは２秒はたったら、関数を呼び出す、サーバーにデータを送るコマンドISTYPINGはfalseを設定されます　
			socket.emit("typing", { isTyping: false });	 //после 2 секунд сервер узнает, что пользователь больге не набирает сообщение
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

	//отправка сообщения
  const sendMessage = () => {
    const timestamp = moment().format(" YYYY-MM-DD HH:mm:ss"); // Создаем временную метку
    socket.emit("createMessage", { name: name, text: text, timestamp }, () => {
      setText("");
    });
  };
  

	//присоединение к чату
  const join = (event: any) => {
		event.preventDefault();
		socket.emit("join", { name: name, room }, () => {
			dispatch(showChat(true));      
		});
	};

	
const changeRoom = (newRoom: string) => {
  socket.emit("join", { name, room: newRoom }, () => {
    setRoom(newRoom);
    // После входа в комнату, переходите на новую страницу с чатом
    window.location.href = `/chat/${newRoom}`;
    console.log(`Joined room: ${newRoom}`); // Добавьте этот console.log
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

          <div>
						<span>ルームを選んでください</span>
						<button onClick={() => changeRoom('roomA')}>A</button>
						<button onClick={() => changeRoom('roomB')}>B</button>
						<button onClick={() => changeRoom('roomC')}>C</button>
					</div>

					<div className="chat_container">
						<div className="message_container">
							{chatLog.map((item: any, index) => (
								<div key={index}>
									<span>{item.name}</span>
									<span>：{item.text}</span>
                  <span>{item.timestamp}</span>
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
						<span>ユーザー名</span>
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
						<button onClick={join}>登録</button>
					</div>
					<div>
						<button onClick={sendMessage}> send </button>
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