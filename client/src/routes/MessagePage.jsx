import { useContext } from "react"
import NavBar from "../components/NavBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import { MessageCard } from "../components/MessageCard";

export const MessagePage = () =>{
    const{currentUser} = useContext(AuthContext);

    if(!currentUser){
        return <Navigate to="/signin"/>
    }

    return (
        <div>
            <NavBar />
            <div className="bg-background-color text-white h-[100vh] grid grid-cols-4">
                <div className="col-span-1">
                    <div className="p-4 bg-black border-b-1">
                        <div className="flex bg-secondary-color max-w-max p-3 rounded-lg space-x-2">
                            <AddIcon />
                            <div>
                                New Conversation
                            </div>
                        </div>
                    </div>
                    <div className="text-white">
                        <MessageCard name="John Doe" message="Hi, how are you?"/>
                        <MessageCard name="Jane Doe" message="Can we schedule a call tomorrow?" />
                        <MessageCard name="Jaden Smith" message="Thank you!"/>
                        <MessageCard name="Jaden Smith" message="Thank you!"/>
                        <MessageCard name="Jaden Smith" message="Thank you!"/>
                    </div>
                    
                </div>
                <div className="col-span-3 bg-green-500">
                    User messages
                </div>
            </div>
        </div>
    )
}

function AddIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  
}