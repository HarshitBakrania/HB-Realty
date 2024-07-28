import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { MessageCard } from "../components/MessageCard";
import ProfileIcon from "../components/ProfileIcon.jsx";
import { ChatCard, UserChatCard } from "../components/ChatCard.jsx";
import { useChat } from "../hooks/useChat.js";
import axios from "axios";
import { format } from "timeago.js";

export const MessagePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState("");
  const { chat, loading, updateLastMessage } = useChat();
  console.log(chat);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat && chat.length > 0) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/chats/${chat[0].id}`,
            {
              withCredentials: true,
            }
          );
          setMessages({ ...response.data, receiver: chat[0].receiver });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMessages();
  }, [chat]);

  const openChat = async (id, receiver) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chats/${id}`,
        {
          withCredentials: true,
        }
      );
      setMessages({ ...response.data, receiver });
      console.log(messages);
    } catch (err) {
      console.log(err);
    }
  };

  const sendText = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/messages/${messages.id}`,
        {
          text,
        },
        {
          withCredentials: true,
        }
      );
      console.log(text);
      setMessages((prev) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));
      updateLastMessage(messages.id, response.data.text);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (loading) {
    return <div>Loading...</div>;
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
            {chat.map((c) => {
              return (
                <MessageCard
                  name={c.receiver.username}
                  message={c.lastMessage}
                  onClick={() => openChat(c.id, c.receiver)}
                  key={c.id}
                />
              );
            })}
          </div>
        </div>

        {messages && (
          <div className="flex-1 flex flex-col">
            <div className="text-lg p-4 border-b border-slate-600 flex items-center gap-2">
              <ProfileIcon size={50} />
              <div className="flex flex-col">
                <div>{messages.receiver.username}</div>
                <div className="text-sm text-slate-500">Online</div>
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
                    avatar={messages.receiver.avatar}
                  />
                );
              })}
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

function AddIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

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
