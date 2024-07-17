import { useContext } from "react"
import NavBar from "../components/NavBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

export const MessagePage = () =>{
    const{currentUser} = useContext(AuthContext);

    if(!currentUser){
        return <Navigate to="/signin"/>
    }

    return (
        <div>
            <NavBar />
            <div className="bg-background-color text-white h-[100vh]">
                Messaging page
            </div>
        </div>
    )
}