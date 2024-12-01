import ProfileIcon from "./ProfileIcon"

export const MessageCard = ({name, message, className, onClick, avatar}) =>{
    return(
        <div className={`text-white p-4 border-b border-slate-600 w-full flex hover:cursor-pointer ${className}`} onClick={onClick}>
            {avatar ? <img src={avatar} className="w-14 h-14 rounded-full"/> : <ProfileIcon size={55}/>}
            <div className="ml-4">
                <div className="text-lg font-semibold">
                    {name}
                </div>
                <div className="text-sm text-white/90">
                    {message}
                </div>
            </div>   
        </div>
    )
}
