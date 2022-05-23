import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  // 내 채팅
  const [writeChat, setWriteChat] = useState({
    name: "애저톤",
    text: "",
    id: uuidv4(),
  });

  const [receiveChats, setOnReceiveChats] = useState([]);

  const onChangeText = (e) => {
    const { value } = e.target;
    setWriteChat({ ...writeChat, text: value });
  };

  const sendChat = (e) => {
    e.preventDefault();
    setOnReceiveChats([...receiveChats, writeChat]);
    setWriteChat({ ...writeChat, id: uuidv4(), text: "" });
  };

  console.log(receiveChats);

  return (
    <div style={{ position: "absolute", top: "60%" }}>
      <div
        style={{
          width: "600px",
          height: "400px",
          border: "1px solid #ddd",
          overflow: "auto",
        }}
      >
        {receiveChats.map((info) => {
          return (
            <div key={info.id}>
              [{info.name}] : {info.text}, {info.id}
            </div>
          );
        })}
      </div>
      <form onSubmit={sendChat}>
        <input
          style={{
            width: "500px",
          }}
          type="text"
          onChange={onChangeText}
          value={writeChat.text}
        ></input>
      </form>
    </div>
  );
}

export default App;
