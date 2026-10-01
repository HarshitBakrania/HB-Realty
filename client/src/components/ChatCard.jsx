import ProfileIcon from "./ProfileIcon";

export function ChatCard({ name, message, time, avatar }) {
  return (
    <div className="flex items-end gap-2 max-w-[80%]">
      <div className="flex-shrink-0">
        {avatar ? avatar : <ProfileIcon size={32} />}
      </div>
      <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 bg-message-color">
        <div className="text-xs font-semibold text-white/50 mb-1">{name}</div>
        <p className="text-sm leading-relaxed text-white">{message}</p>
        <div className="text-[10px] text-white/30 mt-1.5 text-right">{time}</div>
      </div>
    </div>
  );
}

export function UserChatCard({ message, time }) {
  return (
    <div className="flex items-end justify-end gap-2 max-w-[80%] ml-auto">
      <div className="rounded-2xl rounded-br-sm px-4 py-2.5 bg-white text-black">
        <p className="text-sm leading-relaxed">{message}</p>
        <div className="text-[10px] text-black/40 mt-1.5 text-right">{time}</div>
      </div>
    </div>
  );
}
