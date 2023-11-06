import React, { useState, useEffect, CSSProperties, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showChat, setName } from "../redux/slices/chatSlice";
// import { showMessage } from "../redux/slices/uxSlice";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { RoomButton } from "./ChatHomePage";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  margin: "0 auto",
  borderColor: "red",
};

const Container = styled.div`
  margin-top: 18px;
  display: flex;
  background-color: red;
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
  background-color: #ffffff;
  padding: 20px;
  /* display: flex; */
  list-style: none;
  margin: 0;
  width: 80%;
  max-height: 300px;
  overflow-y: auto;
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
const Nav = styled.nav`
  flex: 2;
`;
const Article = styled.article`
  flex: 8;
  text-align: center;
  padding: 20px;
`;
const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  .date {
    margin-left: 10%;
    font-size: 1.3rem;
  }
`;
const Content = styled.div`
  display: flex;
  font-size: 1.5rem;
`;
const Main = styled.main`
  /* display: flex; */
  
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
  const [roomName, setRoomName] = useState(searchParams.get("room"));
  const [userName, setUserName] = useState(searchParams.get("name"));
  const dispatch = useDispatch();
  // const userName = searchParams.get("name");
  // const roomName = searchParams.get("room");

  // const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatLog>([]);
  const [text, setText] = useState<string>(""); //入力するテクスト
  const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
  const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const [room, setRoom] = useState<string>("");

  const joined = useSelector((state: any) => state.chat.joined);

  useEffect(() => {
    //接続が完了したら、発火
    socket.on("connect", () => {
      console.log("接続ID : ", socket.id);
    });
    socket.emit("join", { name: userName, room: roomName }, () => {
      dispatch(showChat(true));
    });

    // 切断
    // return () => {
    // 	console.log("切断");
    // 	socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    console.log("text=", text);
    socket.emit("typing", { isTyping: true, room: roomName }); //入力テキストは変わると　EMITはサーバーにデータを送るコマンドISTYPINGはトゥルーというステータス
    console.log(roomName);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      //タイムは２秒はたったら、関数を呼び出す、サーバーにデータを送るコマンドISTYPINGはfalseを設定されます
      socket.emit("typing", { isTyping: false, room: roomName });
    }, 2000);
  }, [text]);

  const sendMessage = () => {
    setText("");
    socket.emit(
      "createMessage",
      { name: userName, room: roomName, text: text },
      () => {
        setText("");
      }
    );
  };
  const BackMessage = () => {
    navigate("/chathome");
  };

  const handleChangeGroup = (roomName: string) => {
    // Cập nhật trạng thái roomName
    setRoomName(roomName);
    socket.emit("findAllMessages", { room: roomName }, (chat: any) => {
      setChatLog(chat);
      console.log("chat受信", chat);
      // console.log("全てchat受信", chatLog);
    });
  };

  useEffect(() => {
    // console.log("useEffectで登録サーバーから初期値を取得");

    // socket.emit("findAllMessages", (chat: any) => {
    socket.emit("findAllMessages", { room: roomName }, (chat: any) => {
      setChatLog(chat);
      console.log("chat受信", chat);
      // console.log("全てchat受信", chatLog);
    });

    socket.on("message", (message) => {
      // console.log("message=", message);
      setChatLog((current) => [...current, message]); //currentでメッセージリストをもう一個追加する

      // console.log(current);
      // console.log(chatLog);
    });
    socket.on("typing", ({ name, isTyping }) => {
      //socket.on
      console.log("誰かが入力してます");
      // console.log(name);
      if (isTyping) {
        // console.log("typing");
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
  return (
    <Container>
      <Nav>
        <p>Select a room:</p>
        <Link to={`/chat?room=roomA&name=${userName}`}>
          <RoomButton onClick={() => handleChangeGroup("roomA")}>
            Room A
          </RoomButton>
        </Link>
        <Link to={`/chat?room=roomB&name=${userName}`}>
          <RoomButton onClick={() => handleChangeGroup("roomB")}>
            Room B
          </RoomButton>
        </Link>
        <Link to={`/chat?room=roomC&name=${userName}`}>
          <RoomButton onClick={() => handleChangeGroup("roomC")}>
            Room C
          </RoomButton>
        </Link>
      </Nav>
      <Article>
        <Main>
          <Title>Chat Room: {roomName}</Title>
          {joined ? (
            <ChatContainer>
              <MessageList>
                {chatLog.map((item: any, index) => (
                  <div key={index}>
                    <Text>
                      <span>名前：{item.name}さん</span>
                      <span className="date">{item.date}</span>
                    </Text>
                    <Content>{item.text}</Content>
                  </div>
                ))}
                <div>
                  {typingDisplay ? (
                    <>
                      <p>{typingName}</p>
                      <PulseLoader
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
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
        </Main>
      </Article>
    </Container>
  );
};

export default ChatRoomPage;
