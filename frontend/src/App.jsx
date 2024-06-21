import {useState, useEffect} from "react";
import "./App.css";
import {io} from "socket.io-client";
import {nanoid} from "nanoid";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(1);

function App() {
  const [message, setMessage] = useState(""); // state of message sending to socket
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, userName});
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    return () => socket.off("chat");
  });

  return (
    <>
      <h1>Chatting app</h1>

      {chat.map((payload, index) => {
        return (
          <p key={index}>
          {payload.message} | <span>id : {payload.userName}</span>
          </p>
        );
      })}
      <form
        onSubmit={sendChat}
        action=""
      >
        <input
          type="text"
          placeholder="send text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="chat"
        />
        <br />
        <br />
        <button type="submit"> Send</button>
      </form>
    </>
  );
}

export default App;
