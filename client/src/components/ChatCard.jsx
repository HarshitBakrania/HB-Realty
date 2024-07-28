import ProfileIcon from "./ProfileIcon";
export function ChatCard({ name, message, time, avatar }) {
  return (
    <div className="flex items-start">
        {avatar ? avatar : <ProfileIcon size={40} />}
      <div className="ml-2 rounded-lg p-3 max-w-lg bg-message-color">
        <div className="font-semibold text-xl">{name}</div>
        <p className="text-lg">{message}</p>
        <div className="text-sm text-gray-400 mt-1">{time}</div>
      </div>
    </div>
  );
}

export function UserChatCard({ message, time }) {
  return (
    <div className="flex items-start justify-end">
      <div className="bg-navbar-color rounded-lg p-3 max-w-lg text-black">
        <div className="font-semibold text-xl">You</div>
        <p className="text-lg">{message}</p>
        <div className="text-sm text-slate-800 mt-1">{time}</div>
      </div>
    </div>
  );
}
