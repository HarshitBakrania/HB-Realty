import { useContext } from "react";
import Button from "../components/Button"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const UserPage = () =>{
    const {updateUser, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    async function LogoutUser(){
        try{
            const response = await axios.post("http://localhost:3000/api/auth/logout");
            updateUser(null);
            navigate("/")
        }catch(error){
            console.log(error)
        }  
    }
    
    return(
        <div className="bg-background-color h-[100vh]">
            <Button label="Logout" onClick={LogoutUser}/>
        </div>
    )
}

