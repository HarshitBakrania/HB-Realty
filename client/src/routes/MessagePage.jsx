import { useContext } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { MessageCard } from "../components/MessageCard";
import ProfileIcon from "../components/ProfileIcon.jsx";
import { ChatCard, UserChatCard } from "../components/ChatCard.jsx";

export const MessagePage = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex flex-col h-screen bg-background-color text-white">
      <NavBar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/4 flex flex-col border-r border-slate-600">
          <div className="p-4 bg-black">
            <button className="flex items-center bg-secondary-color p-3 rounded-lg space-x-2">
              <AddIcon />
              <span>New Conversation</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MessageCard name="John Doe" message="Hi, how are you?" />
            <MessageCard
              name="Jane Doe"
              message="Can we schedule a call tomorrow?"
            />
            <MessageCard name="Jaden Smith" message="Thank you!" />
            <MessageCard name="Jaden Smith" message="Thank you!" />
            <MessageCard name="Jaden Smith" message="Thank you!" />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="text-lg p-4 border-b border-slate-600 flex items-center gap-2">
            <ProfileIcon size={50}/>
            <div className="flex flex-col">
              <div>John Doe</div>
              <div className="text-sm text-slate-500">Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatCard name="John Doe" message="Yes, I'm interested Hey, are you still interested in that property? Hey, are you still interested in that property?" time="1h" />

            <UserChatCard message="Yes, I'm interested Hey, are you still interested in that property? Hey, are you still interested in that property?" time="2h" />
          </div>

          <div className="p-4 border-t border-slate-600">
            <div className="flex items-center bg-gray-800 rounded-lg">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent p-3 focus:outline-none"
              />
              <button className="p-3 bg-white rounded-lg">
                <SendButton />
              </button>
            </div>
          </div>
        </div>
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
  
function SendButton() {
  return (
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
  );
}
