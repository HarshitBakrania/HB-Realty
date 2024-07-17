import { useContext } from "react";
import Button from "../components/Button"
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import NavBar from "../components/NavBar";

export const UserPage = () =>{
    const {updateUser, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    if(!currentUser){
        return <Navigate to="/signin"/>
    }
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
        <div>
            <NavBar/>
            <div className="text-white grid grid-cols-4 bg-background-color h-[100vh]">
                <div className="col-span-3">
                    <div className="p-10 flex justify-between">
                        <div className="text-3xl font-semibold">
                            Your Listings
                        </div>
                        <Button label="Create New Listing" />
                    </div>
                    
                </div> 
                <div className="col-span-1 bg-secondary-color max-h-max p-6 space-y-5">
                    <div className="flex justify-between">
                        <div className="text-3xl font-bold">
                            Account Information
                        </div>
                        <Button label="Update Profile" onClick={() => navigate("/user/update")} />
                    </div>
                    <div className="space-y-4">
                        <div className="text-lg font-semibold">
                            Avatar:
                        </div>
                        <div className="text-lg font-semibold">
                            Username: {currentUser.username}
                        </div>
                        <div className="text-lg font-semibold">
                            Email Address: {currentUser.email}
                        </div>
                        <div className="max-w-24 pt-2">
                            <Button label="Logout" onClick={LogoutUser} />
                        </div>      
                    </div>
                </div>         
            </div>     
        </div>
    )
}

