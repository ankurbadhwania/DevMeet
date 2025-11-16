import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-zinc-100 p-4 font-inter flex justify-center">
      <div className="w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-100 flex flex-col">
          {messages.map((msg, index) => {
            const mine = user.firstName === msg.firstName;

            return (
              <div
                key={index}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] p-3 my-2 rounded-[18px] text-sm leading-5 shadow-sm ${
                    mine
                      ? "bg-[#DCF8C6] text-[#303030] rounded-br-2xl"
                      : "bg-white text-[#303030] rounded-bl-2xl"
                  }`}
                >
                  <div className="break-words whitespace-pre-wrap font-semibold">
                    {msg.text}
                  </div>

                  <div className="flex justify-between items-center mt-1 gap-16">
                    <div className="text-[11px]">
                      {msg.firstName} {msg.lastName}
                    </div>

                    <div className="text-[11px] text-gray-500">
                      {/* {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })} */}
                      {/* 11:30 */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-full">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 text-sm outline-none bg-white rounded-full"
            />

            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 mr-2 rounded-full text-sm font-medium cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
