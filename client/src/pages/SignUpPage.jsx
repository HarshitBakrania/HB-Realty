import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { useContext, useState } from "react"
import axios from "axios"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"

export const SignUpPage = () => {
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext)
    
    async function RegisterUser(){
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,{
                username,
                email,
                password
            })
            console.log(response.data);
            const login = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
                username,
                password
            },{ withCredentials: true });
            updateUser(login.data);
            navigate("/");
        }catch(error){
            setError(error.response.data.message);
            console.log(error.response.data.message);
        } 
    }

    return (
        <div className="bg-background-color h-full">
            <NavBar />
            <div className="text-white h-[100vh] py-40">
                <div className="text-center space-y-2">
                    <div className="text-3xl font-bold">
                        Register
                    </div>
                    <div className="font-normal text-lg">
                    Create your account to get started
                    </div>
                </div>
                <div className="bg-secondary-color border-1 max-w-md mx-auto mt-6 p-6 space-y-3 rounded-lg">
                    <InputBox onChange={e =>{
                        setUsername(e.target.value);
                    }} type="text" label="Username" placeholder="John_Doe" />
                    <InputBox onChange={e =>{
                        setEmail(e.target.value)
                    }} type="email" label="Email" placeholder="john@example.com" />
                    <InputBox onChange={e =>{
                        setPassword(e.target.value)
                    }} type="password" label="Password" placeholder="***********" />
                    <Button onClick={RegisterUser} label="Register" className="w-full mt-6" />
                    <div className="text-red-600 font-medium text-base">
                        {error}
                    </div>
                    <div>
                        Already have an account?
                        <Link to="/signin" className="underline pl-2 font-semibold">Login</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
