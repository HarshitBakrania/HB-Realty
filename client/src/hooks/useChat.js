import { useEffect, useState } from "react";
import axios from "axios";

export const useChat = () => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chats`, {
          withCredentials: true,
        });
        setChat(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchChat();
  }, []); 

  const updateLastMessage = (chatId, newMessage) => {
    setChat((prevChat) =>
      prevChat.map((c) =>
        c.id === chatId ? { ...c, lastMessage: newMessage } : c
      )
    );
  };

  return {
    chat,
    loading,
    updateLastMessage,
  };
};