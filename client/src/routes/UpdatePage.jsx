import { useContext } from "react"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export const UpdatePage = () => {
    const{updateUser, currentUser} = useContext(AuthContext);

    if(!currentUser){
        return <Navigate to="/signin" />
    }

    return (
        <div className="bg-background-color h-[100vh]">
            <NavBar />
            <div className="text-3xl font-bold text-center pt-24 text-white">
                Update Profile
            </div>
            <div className="bg-secondary-color border-1 max-w-md mx-auto mt-6 p-6 space-y-3 rounded-lg text-white">
                <InputBox label="Username" placeholder="john" type="text" defaultValue={currentUser.username} />
                <InputBox label="Email" placeholder="john@example.com" type="email"  defaultValue={currentUser.email} />
                <InputBox label="Password" placeholder="*********" type="password" />
                <Button label="Update" />
            </div>
        </div>
    )
}