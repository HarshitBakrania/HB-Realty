import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { MessageCard } from "../components/MessageCard";
import ProfileIcon from "../components/ProfileIcon.jsx";
import { ChatCard, UserChatCard } from "../components/ChatCard.jsx";
import { useChat } from "../hooks/useChat.js";
import axios from "axios";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext.jsx";
import { AddIcon } from "../components/icons/icons.jsx";
import useNotificationStore from "../store/hooks/useNotificationStore.js";

export const MessagePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState("");
  const [text, setText] = useState("");
  const { chat, loading, updateLastMessage } = useChat();
  const {notification, decrease} = useNotificationStore();

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    const readMessage = async () => {
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/chats/read/${messages.id}`, {}, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (messages && socket) {
      socket.on("getMessage", (data) => {
        if (messages.id === data.chatId) {
          setMessages((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          readMessage();
        }
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, messages]);

  const openChat = async (id, receiver) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats/${id}`,
        {
          withCredentials: true,
        }
      );
      decrease();
      setMessages({ ...response.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const sendText = async () => {
    if (!text) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/${messages.id}`,
        {
          text,
        },
        {
          withCredentials: true,
        }
      );
      setMessages((prev) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));
      updateLastMessage(messages.id, response.data.text);
      setText("");
      socket.emit("sendMessage", {
        receiverId: messages.receiver.id,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex flex-col h-screen bg-background-color">
      <NavBar />
      <div className="flex-1 flex overflow-hidden text-white">
        <div className="w-1/4 flex flex-col border-r border-slate-600">
          <div className="p-4 bg-black">
            <button className="flex items-center bg-secondary-color p-3 rounded-lg space-x-2">
              <AddIcon />
              <span>New Conversation</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chat?.map((c) => {
              let seen = c.seenBy.includes(currentUser.id);
              return (
                <MessageCard
                  name={c.receiver.username}
                  avatar={c.receiver.avatar}
                  message={c.lastMessage}
                  onClick={() => openChat(c.id, c.receiver)}
                  key={c.id}
                  className={
                    seen || messages?.id === c.id
                      ? "bg-background-700"
                      : "bg-slate-700"
                  }
                />
              );
            })}
          </div>
        </div>

        {messages && (
          <div className="flex-1 flex flex-col">
            <div className="text-lg p-4 border-b border-slate-600 flex items-center gap-2">
              {messages.receiver.avatar ? <img src={messages.receiver.avatar} className="rounded-full size-12" /> : <ProfileIcon size={50} />}
              <div className="flex flex-col">
                <div className="font-semibold text-xl pl-2">{messages.receiver.username}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.messages.map((m) => {
                return m.userId === currentUser.id ? (
                  <UserChatCard message={m.text} time={format(m.createdAt)} />
                ) : (
                  <ChatCard
                    name={messages.receiver.username}
                    message={m.text}
                    time={format(m.createdAt)}
                    avatar={
                      messages.receiver.avatar ? (
                        <img
                          src={messages.receiver.avatar}
                          className="rounded-full size-12"
                        />
                      ) : null
                    }
                  />
                );
              })}
              <div ref={messageEndRef}></div>
            </div>

            <div className="p-4 border-t border-slate-600">
              <div className="flex items-center bg-gray-800 rounded-lg">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent p-3 focus:outline-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button className="p-3 bg-white rounded-lg">
                  <SendButton onClick={sendText} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function SendButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <svg
        className="w-6 h-6 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        ></path>
      </svg>
    </button>
  );
}
