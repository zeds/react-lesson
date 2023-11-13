// import { DISPLAY_LG } from "../../GlobalStyle"
import { useEffect, useRef, useState } from "react";

const DISPLAY_LG = "1000px";
type Message = {
  content: string;
  from: string;
  to?: string;
};
type User = {
  id: string;
  name: string;
};

export default function Test() {
  const partners = [
    { id: "smith", name: "Smith" },
    { id: "anna", name: "Anna" },
    { id: "greg", name: "Greg" },
  ];
  const [partner, setPartner] = useState<User>(partners[0]);
  const [user] = useState<User>({ id: "ozod", name: "Ozodjon" });

  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      <div style={{ width: "100%", maxWidth: DISPLAY_LG, padding: "30px" }}>
        <h1>Chat App</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <ChatInstance
            user={user}
            partner={partner}
            messages={messages.filter(
              (m) =>
                (m.from == partner.id && m.to == user.id) ||
                (m.from == user.id && m.to == partner.id)
            )}
            setMessages={(message: Message) =>
              setMessages((prev) => [...prev, message])
            }
          />
          <ChatInstance
            user={partner}
            partner={user}
            messages={messages.filter(
              (m) =>
                (m.from == partner.id && m.to == user.id) ||
                (m.from == user.id && m.to == partner.id)
            )}
            setMessages={(message: Message) =>
              setMessages((prev) => [...prev, message])
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {partners
              .filter((p) => p.id !== partner.id)
              .map((p) => (
                <button
                  onClick={() => setPartner(p)}
                  style={{ padding: "10px" }}
                >
                  {p.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ChatInstance = ({
  user,
  messages,
  setMessages,
  partner,
}: {
  user: { id: string; name: string };
  partner?: { id: string; name: string };
  messages: Message[];
  setMessages: (message: Message) => void;
}) => {
  const [inputvalue, setInputValue] = useState("");
  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTop = myRef.current.scrollHeight;
    }
  }, []);
  console.log("messages=",messages)
  console.log("user=",user)
  console.log("partner",partner)
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        ref={myRef}
        style={{
          width: "100%",
          height: "500px",
          background: "white",
          position: "relative",
          paddingBottom: "30px",
          overflow: "scroll",
        }}
      >
        <h2
          style={{
            position: "sticky",
            top: 0,
            padding: "20px",
            background: "#fff",
            borderBottom: "1px solid #efefef",
          }}
        >
          {partner?.name}
        </h2>
        {messages.map((m) => ( //.reverse() đảo ngược
          <MessageInstance user={user} m={m} partner={partner} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          width: "100%",
          padding: "5px 10px",
        }}
      >
        <input
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: "90%", height: "30px" }}
          type="text"
        />
        <button
          style={{ width: "10%" }}
          onClick={() => {
            if (inputvalue) {
              setMessages({
                from: user.id,
                to: partner?.id,
                content: inputvalue,
              });
              setInputValue("");
            }
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

const MessageInstance = ({
  m,
  user,
  partner,
}: {
  m: Message;
  user: { id: string; name: string };
  partner?: { id: string; name: string };
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: m.from === user.id ? "right" : "left",
        fontSize: "15px",
        padding: "10px",
        alignItems: "center",
        gap: "3px",
      }}
    >
      {m.from !== user.id && (
        <div
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            color: "#fff",
            background: "green",
          }}
        >
          {partner?.name.charAt(0)}
        </div>
      )}
      <span
        style={{
          background: "lightgray",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {m.content}
      </span>
    </div>
  );
};
