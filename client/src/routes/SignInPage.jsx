import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { useState } from "react"
import axios from "axios"

export const SignInPage = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();

    async function LoginUser(){
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{
                username,
                password
            })
            navigate("/")
        }catch(error){
            setError(error.response.data.message);
        }
    }

    return (
        <div className="bg-background-color h-[100vh] text-white">
            <NavBar />
            <div className="text-center pt-24 space-y-2">
                <div className="text-3xl font-bold">
                    Welcome Back!
                </div>
                <div className="font-normal text-lg">
                Sign in to your account to access the latest real estate listings.
                </div>
            </div>
            <div className="bg-secondary-color border-1 max-w-md mx-auto mt-6 p-6 space-y-3 rounded-lg">
                <InputBox onChange={e =>{
                    setUsername(e.target.value)
                }} label="Username" placeholder="Enter your username" type="text"/>
                <InputBox onChange={e =>{
                    setPassword(e.target.value)
                }} label="Password" placeholder="Enter your password" type="password"/>
                <Button onClick={LoginUser} label="Sign In"/>
                <div className="text-red-600 font-medium text-base">
                    {error}
                </div>
                <div>
                    Don't have an account? 
                    <Link to="/signup" className="underline pl-2 font-semibold">Register</Link>
                </div>
            </div>
        </div>
    )
}