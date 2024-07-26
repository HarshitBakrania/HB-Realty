import ProfileIcon from "./ProfileIcon"

export const MessageCard = ({name,message}) =>{
    return(
        <div className="text-white p-4 border-b border-slate-600 w-full flex">
            <ProfileIcon size={40}/>
            <div className="ml-4">
                <div className="text-lg">
                    {name}
                </div>
                <div className="text-sm">
                    {message}
                </div>
            </div>   
        </div>
    )
}
