import {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  useLayoutEffect,
} from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  margin: "0 auto",
  marginBottom: "100px",
  borderColor: "red",
};

const Pulse = styled.div`
  width: 100px;
  height: 30px;
  background: red;
  position: fixed;
  left: 0;
  bottom: 55px;
`;

const LabelBox = styled.div`
  width: 100%;
  height: 70px;
  background: orange;
  position: fixed;
  left: 0;
  top: 62px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  background: green;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px;
  input {
    width: 300px;
    height: 40px;
    padding: 5px;
  }
  button {
    margin-left: 5px;
    width: 50px;
    height: 40px;
  }
`;

const ChatFrame = styled.div`
  overflow: auto;
  margin-top: 68px;
  width: 100%;
  height: 80vh;
  background: purple;
  align-items: flex-end;
  padding-bottom: 100px;
  div {
    background: yellow;
  }
`;

const MessageBox = styled.div`
  max-width: 800px;
  background: #eeeeee;
  margin: 10px;
  .timestamp {
    font-size: 15px;
  }
  div {
    margin-left: 60px;
  }
`;

const Frame = styled.div`
  width: 100%;
  height: 100vh;
  background: lightblue;
  padding-top: 64px;
  font-size: 20px;
  padding: input {
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
type Room = {
	name:string;
	id:string;
}

type ChatLog = Array<Chat>;
type RoomLog = Array<Room>;

//接続
const socket = io("http://localhost:3005/events");
// const socket = io("https://linkstaff.online:3000");
// const socket = io("http://danang-alley.com:3443");
const Chat = () => {
  const [room, setRoom] = useState("");
  const [chatLog, setChatLog] = useState<ChatLog>([]);
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [joined, setJoined] = useState(false);
  const [typingDisplay, setTypingDisplay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refChatFrame = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const [rooms, setRooms] = useState<RoomLog>([]);

  useEffect(() => {
    console.log("refChatFrame.current=", refChatFrame.current);
    if (refChatFrame.current) {
      refChatFrame.current.scrollTop = refChatFrame.current.scrollHeight;
    }
  }, [refChatFrame.current]);

  useLayoutEffect(() => {
    if (refChatFrame.current) {
      refChatFrame.current.scrollTop = refChatFrame.current.scrollHeight;
      // 下のコードは、少ししかスクロールできなかった
      // refChatFrame.current.scrollIntoView(false);
    }
  }, [showAll]);

  //ルーム名が変更されたら、呼び出される
  useEffect(() => {
    document.body.style.overflow = "hidden";

    console.log("room名：", room);
    //参加しているルームのメッセージを取得
    socket.emit("findAllMessages", { room: room }, (chat: any) => {
      setChatLog(chat);
      console.log("chat受信", chat);
      console.log("chat受信", chatLog);
    });
  }, [room]);

  //タイピング
  useEffect(() => {
    console.log("text=", text);
    socket.emit("typing", { room: room, isTyping: true });

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      socket.emit("typing", { room: room, isTyping: false });
    }, 2000);
  }, [text]);

  useEffect(() => {
    console.log("useEffectで登録サーバーから初期値を取得");
    socket.recovered;

    //socket.onはAddEventListerと同じでイベントハンドラーとして扱う。

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
    socket.emit("createMessage", { name: name, room: room, text: text }, () => {
      //TODO: clear name, text
      setText("");
    });
    setShowAll(!showAll);

    // refChatFrame.current?.scrollIntoView({ behavior: "smooth" });
  };

  const joinRoom = (item: string) => {
    console.log(item + "に参加しました");
    setRoom(item);
    socket.emit("join", { room: item, name: name }, (ret: any) => {
      console.log("join response=", ret);
      setJoined(true);
    });
  };

  const exitRoom = () => {
    setJoined(false);
  };

  return (
    <>
      <Frame>
        {joined ? (
          <div>
            <LabelBox>
              <div>
                <div>参加している部屋：{room}</div>
                <span>お名前：</span>
                <span>{name}</span>
              </div>
              <button onClick={() => exitRoom()}>退出</button>
            </LabelBox>

            <ChatFrame ref={refChatFrame}>
              {chatLog.map((item: any, index) => (
                <MessageBox key={index}>
                  <span>名前：</span>
                  <span>{item.name}</span>
                  <span className="timestamp">{item.date}</span>
                  <div>{item.text}</div>
                </MessageBox>
              ))}
            </ChatFrame>
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
              {rooms.map((item: any, index: any) => (
                <button key={index} onClick={() => joinRoom(item.name)}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </Frame>

      <Pulse>
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
      </Pulse>

      <Footer>
        <input
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="メッセージ"
        />
        <button onClick={sendMessage}> 送信 </button>
      </Footer>
    </>
  );
};

export default Chat;
