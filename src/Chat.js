import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import image from "./playVideo/test.png";
import "./font/font.css";
import { Client } from "@stomp/stompjs";
import { UserDispatch } from "./App";

const Chat = (prop) => {
  const name = prop.name;

  // 내가 입력중인 채팅
  const [writeChat, setWriteChat] = useState({
    name: name,
    text: "",
  });

  // 받은 채팅
  const [receiveChats, setReceiveChats] = useState([]);

  // 채팅
  const onChangeText = (e) => {
    const { value } = e.target;
    setWriteChat({ ...writeChat, text: value });
  };

  // 채팅 보내기
  const sendChat = (e) => {
    e.preventDefault();
    setWriteChat({ ...writeChat, text: "" });
    handler();
  };

  // 웹소켓을 위한 client 생성
  const client = useRef(null);

  const subscribe = () => {
    if (client.current != null) {
      client.current.subscribe("/sub/message", (data) => {
        const newMessage = { ...JSON.parse(data.body), id: uuidv4() };
        setReceiveChats((receiveChats) => [...receiveChats, newMessage]);
      });
    }
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const connect = () => {
    client.current = new Client({
      brokerURL: "ws://localhost:8080/chat/websocket",
      // brokerURL: "ws://20.89.45.241:8080/chat/websocket",
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };

  const handler = () => {
    if (client.current != null) {
      if (!client.current.connected) return;
      client.current.publish({
        destination: "/pub/message",
        body: JSON.stringify({
          userName: writeChat.name,
          message: writeChat.text,
        }),
      });
    }
  };

  const disConnect = () => {
    if (client.current != null) {
      if (client.current.connected) client.current.deactivate();
    }
    console.log("disconnected");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{ position: "absolute", top: "60%", background: "transparent" }}
      >
        <div
          style={{
            width: "600px",
            height: "270px",
            border: "1px",
            overflow: "auto",
          }}
        >
          {receiveChats.map((info) => {
            return (
              <div
                key={info.id}
                style={{
                  margin: "0px 0px 5px 40px",
                  fontFamily: "koverwatch",
                  fontSize: "22px",
                  color: "#218FFE",
                }}
              >
                • [{info.userName}]: {info.message}, {info.id}
              </div>
            );
          })}
        </div>
        <form onSubmit={sendChat} style={{ background: "transparent" }}>
          <input
            style={{
              width: "500px",
              height: "22px",
              margin: "0px 0px 0px 40px",
              background: "transparent",
              color: "white",
              fontFamily: "koverwatch",
              fontSize: "22px",
            }}
            type="text"
            onChange={onChangeText}
            value={writeChat.text}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Chat;
