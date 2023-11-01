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
const socket = io("http://localhost:3443");
// const socket = io("http://danang-alley.com:3443");

const Chat = () => {
  const [chatLog, setChatLog] = useState<ChatLog>(() => {
    // Попытка загрузить данные чата из localStorage при загрузке компонента
    const savedChatLog = localStorage.getItem("chatLog");
    return savedChatLog ? JSON.parse(savedChatLog) : [];
  });
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [joined, setJoined] = useState(false);
  const [typingDisplay, setTypingDisplay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
      setChatLog((current) => {
        const updatedChatLog = [...current, message];
        // Сохранение данных чата в localStorage
        localStorage.setItem("chatLog", JSON.stringify(updatedChatLog));
        return updatedChatLog;
      });
    });

    socket.on("typing", ({ name, isTyping }) => {
      if (isTyping) {
        setTypingDisplay(true);
      } else {
        setTypingDisplay(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("createMessage", { name: name, text: text }, () => {
      setText("");
    });
  };

  const join = (event: any) => {
    event.preventDefault();
    socket.emit("join", { name: name }, () => {
      setJoined(true);
	  localStorage.setItem("userName", name);
    });
  };

  useEffect(() => {
	const savedUserName = localStorage.getItem("userName");
		if (savedUserName) {
		setName(savedUserName);
		setJoined(true);
		}
  	}, []);

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
