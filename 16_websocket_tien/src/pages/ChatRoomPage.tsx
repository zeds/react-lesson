import { useState, useEffect, CSSProperties, useRef,useLayoutEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { showChat } from "../redux/slices/chatSlice";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { RoomButton } from "./ChatHomePage";
import downArrow from "../assets/downArrow.svg";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  margin: "0 auto",
  borderColor: "red",
};

const Container = styled.div`
  margin-top: 18px;
  display: flex;
  /* background-color: red; */
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ChatContainer = styled.div`
/* background-color: aquamarine; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
/* list-style: none; */
`;

const MessageList = styled.ul`
  /* background-color: #de6f6f; */
  margin: 0;
  width: 80%;
  overflow-y: scroll;
  height: 70vh;
`;

const InputContainer = styled.div`
  position: relative;
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
  border-right: 1px solid #000000;
`;
const Article = styled.article`
  flex: 8;
  text-align: center;
`;
const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  .date {
    margin-left: 2%;
    font-size: 1.3rem;
  }
`;
const Content = styled.div`
  margin-left: 5%;
  display: flex;
  font-size: 1.7rem;
`;
const Main = styled.main``;
const Typing = styled.div`
  display: flex;
  align-items: center;
  .text {
    font-size: 1rem;
  }
`;
const Loader = styled.div`
  position: relative;
  width: auto;
  height: 20px;
`;
const Img = styled.button`
  /* border: 1px solid black; */
  position: absolute;
  bottom: 50px;
  right: 50%;
  border-radius: 9999px;
  background-color: #c2c2d1;
  img {
    border-radius: 50%;
    color: rgba(86, 88, 105, 1);
    cursor: pointer;
    height: 2rem;
    width: 2.2rem;
  }
`;

type Chat = {
  name: string;
  text: string;
  timestamp: string;
};
type ChatLog = Array<Chat>;

// const socket: Socket = io("http://localhost:3443");
const socket: Socket = io("http://localhost:3000/eventss");

const ChatRoomPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  //ルーム名、ユーザー名
  const [roomName, setRoomName] = useState(searchParams.get("room"));
  // const [userName, setUserName] = useState(searchParams.get("name"));
  const userName = searchParams.get("name");

  const [chatLog, setChatLog] = useState<ChatLog>([]);
  const [text, setText] = useState<string>(""); //入力するテクスト
  const [typingName, setTypingName] = useState<string>(""); //入力するテクスト
  const [typingDisplay, setTypingDisplay] = useState(false); //サーバにテクストを書いている最中に、相手は書いているよ別れるように、なってます
  const joined = useSelector((state: any) => state.chat.joined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageListRef = useRef<HTMLUListElement | null>(null);
  const chatBoxRef = useRef<null>(null);

  // console.log(messageListRef)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageListRef.current]);

   useEffect(() => {
    socket.on("connect", () => {
      // console.log("接続ID : ", socket.id);
    });
    socket.emit("join", { name: userName, room: roomName }, (data:any) => {
      console.log(data)
      dispatch(showChat(true));

    },[]); 
 
    // 切断
    // return () => {
    // 	console.log("切断");
    // 	socket.disconnect();
    // };
  });

  useEffect(() => {
    // console.log("text=", text);
    socket.emit("typing", { isTyping: true, room: roomName }); //入力テキストは変わると　EMITはサーバーにデータを送るコマンドISTYPINGはトゥルーというステータス
    // console.log(roomName);
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
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
    // Cập nhật trạng thái roomName
    setRoomName(roomName);
    socket.emit("findAllMessages", { room: roomName }, (chat: any) => {
      // console.log(chat);
      setChatLog(chat);
    });
  };

  useEffect(() => {
    // console.log("useEffectで登録サーバーから初期値を取得");

    socket.on("message", (message) => {
      setChatLog((current) => [...current, message]); //currentでメッセージリストをもう一個追加する 
    });
    socket.on("typing", ({ name, isTyping }) => {
      console.log("誰かが入力してます");
      if (isTyping) {
        setTypingDisplay(true);
        setTypingName(name);
      } else {
        setTypingDisplay(false);
        setTypingName("");
      }
    });
  },[]);

  useEffect(() => {
    socket.emit(
      "findAllMessages",
      { room: roomName },
      (chat: any) => {
        setChatLog(chat);
      });
  },[roomName]);

  const handleKeyDown = (e:any) => {
		if (e.nativeEvent.isComposing || e.key !== "Enter") return;
		sendMessage()
    if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
	};
  const exitMessenger = () => {
    console.log("切断");

    socket.emit('leaveRoom', { room: roomName, name: userName }); // Gửi yêu cầu rời phòng

    socket.on('leaveRoom', (data) => {
      console.log('User left the room:', data);
      // Thực hiện các tác vụ cần thiết khi người dùng rời phòng.
    });
    socket.on('serverLeave', (data) => {
      console.log('Server left the room:', data);
      // Thực hiện các tác vụ cần thiết khi máy chủ rời phòng.
    });
      socket.disconnect();
      navigate("/chathome");
  };
  
  useEffect(() => {
    // Lắng nghe sự kiện "connect" để biết khi nào kết nối thành công
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  });
console.log(joined)
  return (
    <Container>
      <Nav>
        <h2>Select a room:</h2>
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
          {/* <h2>{joined}</h2> */}
          <Title>Chat Room: {roomName}</Title>
          {/* <h2>{joined}</h2> */}
          <Button style={{ "marginLeft": "78%"}} onClick={exitMessenger}>Exit</Button>
          {joined ? (
            <ChatContainer>
              <MessageList
                ref={messageListRef}
                // id="message-list"
              >
                <div style={{background: "", }}>
                  
                  {chatLog ? (chatLog?.map((item: any, index) => (
                    <div style={{ 
                      // background:"#eeeeee",
                      justifyContent: item.name === userName ? "right" : "left",
                      margin: "15px",
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      gap: "3px",
                      }} key={index}>
                      <Text>
                        <span style={{display: item.name === userName ? "none" : ""}}>名前：{item.name}さん</span>
                      </Text>
                      <Content>{item.text}</Content>
                      <span style={{padding: "20px 0 0 20px"}} className="date">{item.date}</span>
                    </div>
                  ))):""}
                </div>
                <Loader>
                  {typingDisplay ? (
                    <Typing>
                      <span className="text">{typingName}</span>
                      <PulseLoader
                        style={{ left: "15px" }}
                        cssOverride={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Typing>
                  ) : (
                    <div></div>
                  )}
                </Loader>
              </MessageList>
              <InputContainer>
                <Img
                  onClick={() => {
                    if (messageListRef.current) {
                      messageListRef.current.scrollTop =
                        messageListRef.current.scrollHeight;
                    }
                  }}
                >
                  <img src={downArrow} alt=""></img>
                </Img>
                <Input
                  ref={chatBoxRef}
                  type="text"
                  value={text}
                  onKeyDown={handleKeyDown}
                  autoFocus={true}
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
      <>
      </>
    </Container>
  );
};

export default ChatRoomPage;
