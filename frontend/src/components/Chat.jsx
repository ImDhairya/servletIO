import {useState, useEffect, useId} from "react";
// import "../App.css";
import {useContext} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import {UserContext} from "../context/UserContext";

const socket = io.connect("http://localhost:5000");
function Chat() {
  const [message, setMessage] = useState(""); // state of message sending to socket
  const [chat, setChat] = useState([]);
  const [userData, setUserData] = useState("");
  const {userId, setUserId} = useContext(UserContext);
  const [isAnnonomous, setIsAnnonomous] = useState(false);
  // gets you the user name and other user details
  const messanger = async () => {
    if (!userId) {
      setIsAnnonomous(true);
    }
    const user = await axios.post("http://localhost:3002/api/user/getuser", {
      id: userId,
    });
    console.log(user.data.user.name);
    setUserData(user.data.user);
  };
  useEffect(() => {
    messanger();
  }, [userId]);

  const userName = userData.name;

  async function chatUpdate() {
    if (!isAnnonomous) {
      // update the db when the chat is not annonomous
      try {
        const data = await axios.post("", {chat});
        if (!data) {
          console.log('Failed to send data to db')
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const sendChat = (e) => {
    e.preventDefault();

    // working of socket.io
    socket.emit("chat", {message, userName});
    setMessage("");

    //managing chats on db
    chatUpdate();
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    return () => socket.off("chat");
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("adsfasdf", data, {
        withCredentials: true,
      });
      console.log("Login successful:", res.data.username);
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  return (
    <div className=" flex flex-col items-center text-center">
      <h1 className=" text-3xl">Chatting app</h1>

      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {payload.message} |{" "}
            <span>id : {payload.userName || "Annomous chat"}</span>
          </p>
        );
      })}
      <form
        onSubmit={sendChat}
        action=""
      >
        <div className=" flex items-center h-full">
          <div>
            <input
              type="text"
              placeholder="send text"
              value={message}
              className=" p-3 m-4 rounded-lg "
              onChange={(e) => setMessage(e.target.value)}
              name="chat"
            />
          </div>
          <div>
            <button type="submit"> Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;
