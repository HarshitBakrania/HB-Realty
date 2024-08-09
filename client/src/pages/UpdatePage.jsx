import { useContext, useState } from "react"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
import UploadWidget from "../components/UploadImage";
import axios from "axios"
import Footer from "../components/Footer"

export const UpdatePage = () => {
    const{ currentUser, updateUser } = useContext(AuthContext);
    const[username, setUsername] = useState(currentUser.username);
    const[email, setEmail] = useState(currentUser.email);
    const[password, setPassword] = useState("");
    const[avatar, setAvatar] = useState([]);
    const navigate = useNavigate();

    if(!currentUser){
        return <Navigate to="/signin" />
    }

    async function UpdateUser(){
        try{
            const response = await axios.put(`http://localhost:3000/api/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0]
            },{
                withCredentials: true
            })
            updateUser(response.data)
            navigate("/")
        }catch(error){
            console.log(error.response.data)
        }
    }

    return (
        <div className="bg-background-color h-[100vh]">
            <NavBar />
            <div className="text-3xl font-bold text-center pt-24 text-white">
                Update Profile
            </div>
            <div className="bg-secondary-color border-1 max-w-md mx-auto mt-6 p-6 space-y-3 rounded-lg text-white">
                <InputBox onChange={e =>{
                    setUsername(e.target.value)
                }} label="Username" placeholder="john" type="text"  />
                <InputBox onChange={e =>{
                    setEmail(e.target.value)
                }} label="Email" placeholder="john@example.com" type="email"  />
                <InputBox onChange={e =>{
                    setPassword(e.target.value)
                }} label="Password" placeholder="*********" type="password" />
                <div>
                    <img src={avatar[0] }/>
                    <UploadWidget
                            uwConfig={{
                            cloudName: "dwos6fgt6",
                            uploadPreset: "estate",
                            multiple: false,
                            folder: "avatars",
                            }}
                            setState={setAvatar}
                    />
                </div>
                <Button onClick={UpdateUser} label="Update Profile" className="mt-6 w-full"/>
            </div>
            <Footer />
        </div>
    )
    
}