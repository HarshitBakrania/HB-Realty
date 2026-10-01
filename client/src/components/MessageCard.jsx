import ProfileIcon from "./ProfileIcon";

export const MessageCard = ({ name, message, className, onClick, avatar }) => {
  return (
    <div
      className={`text-white px-4 py-3 border-b border-white/5 w-full flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer ${className ?? ""}`}
      onClick={onClick}
    >
      {avatar ? (
        <img src={avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" alt={name} />
      ) : (
        <ProfileIcon size={40} />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold truncate">{name}</div>
        <div className="text-xs text-white/40 truncate mt-0.5">{message}</div>
      </div>
    </div>
  );
};
