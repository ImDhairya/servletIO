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
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [recname, setrecname] = useState("");

  // gets you the user name and other user details
  console.log(userData);
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
  /*
The useEffect hook used for sending the text to receiver only 
useEffect(() => {
  messanger();
  setSender(userData.name);
  console.log(sender);
}, [userId]);
*/

  useEffect(() => {
    if (userId) {
      messanger();
    }
  }, [userId]);

  useEffect(() => {
    setSender(userData.name);
  }, [userData]);

  const userName = userData.name;

  async function chatUpdate() {
    if (!isAnnonomous) {
      // update the db when the chat is not annonomous
      try {
        console.log(typeof chat);
        console.log(chat);
        const lastMessage = chat[chat.length - 1];
        console.log(lastMessage);
        const data = await axios.post(
          "http://localhost:3002/api/chat/addChat",
          {chat: lastMessage.message, userId}
        );
        if (!data) {
          console.log("Failed to send data to db");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function fetchUsers() {
    try {
      const users = await axios.post("http://localhost:3002/api/user/allUsers");
      const data = users.data.users.map((e) => {
        return e._id;
      });
      console.log(users);
      // setSelectedReceiverId(data);
      setSelectedReceiverId(users.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    console.log();

    if (userId && receiver) {
      const messagePayload = {
        message,
        senderId: userId,
        receiverId: receiver,
        receiverName: recname,
        senderName: userData.name, // added to include senders name
      };

      console.log(messagePayload);

      socket.emit("chat", messagePayload);
      console.log(
        `Sent message from userId: ${userId} to receiver ${receiver}`
      );

      setChat((prevChat) => [...prevChat, messagePayload]);
      setMessage("");
    }

    /*
    This is the previous send chat function where in the receiver is only able to see the chat 
    if (userId && receiver) {
      
    
      // working of socket.io
      socket.emit("chat", {
        message,
        senderId: userId,
        receiverId: receiver,
      });
      console.log(
        `Sent message from userId: ${userId} to receiverId: ${receiver}`
      );
      setMessage("");
    }
    */

    //managing chats on db
  };

  // useEffect hook to upload db
  useEffect(() => {
    chatUpdate();
  }, [chat]);

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
      console.log(`Joined room with userId: ${userId}`);
    }

    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
      // setChat([...chat, payload]);
    });

    return () => socket.off("chat");
  }, [userId]);

  /* 
  This useEffect is used for broadcasting 
  Turn this on when want to boradcast annonomously 

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
    return () => socket.off("chat");
  });
  */

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

  function handleReceiverChange(e) {
    const selectedUserId = e.target.value;
    const selectedUser = selectedReceiverId.find(
      (user) => user._id === selectedUserId
    );
    setReceiver(selectedUserId);
    setrecname(selectedUser ? selectedUser.name : "");
  }

  useEffect(() => {
    console.log(recname);
  }, [recname]);

  return (
    <div className=" flex flex-col items-center h-[1000px] text-center">
      <h1 className=" text-3xl">Chatting app</h1>

      <div>
        <label>Select Receiver: </label>
        <select
          value={receiver}
          onChange={handleReceiverChange}
        >
          <option
            value=""
            disabled
          >
            Select a user
          </option>
          {selectedReceiverId &&
            selectedReceiverId.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}
        </select>
        {console.log(receiver)}
      </div>
      {console.log(chat)}
      {chat.map((payload, index) => {
        const senderIdStr = String(payload.senderId);
        const userIdStr = String(userId);

        console.log("payload:", payload);
        console.log("userIdStr:", userIdStr);
        console.log("senderIdStr:", senderIdStr);
        console.log(
          "Comparing userIdStr and senderIdStr:",
          userIdStr === senderIdStr
        );

        return !payload.senderName ? (
          <div className="flex  p-2 m-3 w-[1000px]  text-start  ">
            {payload.message}
          </div>
        ) : (
          <div className=" flex w-[1000px]  p-2 m-3 justify-end text-center ">
            {payload.message}
          </div>
        );
        // return (
        //   <p key={index}>
        //     {payload.message} |
        //     {/* <span>
        //       id:{" "}
        //       {userIdStr === senderIdStr
        //         ? payload.senderName
        //         : payload.receiverName}
        //     </span> */}
        //     <span>id: {payload.senderName}</span>
        //   </p>
        // );
      })}
      <form
        // onSubmit={sendChat}
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
            <button
              type="submit"
              onClick={sendChat}
            >
              {" "}
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;
