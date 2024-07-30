import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { useCookies } from "react-cookie";

export const SignInPage = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const {updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() =>{
            setError("");
        }, 3000)
    },[error])

    async function LoginUser(){
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{
                username,
                password
            },{
                withCredentials: true
            })
            updateUser(response.data)
            navigate("/")
        }catch(error){
            setError(error.response.data.message);
        }
    }

    return (
        <div className="bg-background-color h-[100vh]">
            <NavBar />
            <div className="text-white">
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
                    <div className="w-full">
                        <Button onClick={LoginUser} label="Sign In" className="w-full mt-6"/>
                    </div>
                    <div className="text-red-600 font-medium text-base">
                        {error}
                    </div>
                    <div>
                        Don't have an account? 
                        <Link to="/signup" className="underline pl-2 font-semibold">Sign Up</Link>
                    </div>
                </div>
            </div>  
        </div>
    )
}