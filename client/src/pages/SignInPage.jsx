import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import Footer from "../components/Footer"

export const SignInPage = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);
    const {updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() =>{
            setError("");
        }, 3000)
    },[error])

    async function LoginUser(){
        setLoading(true);
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
                username,
                password
            },{
                withCredentials: true
            })
            updateUser(response.data)
            navigate("/")
        }catch(error){
            setError(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-background-color min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 flex items-center justify-center text-white px-4 sm:px-10 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center space-y-2 mb-8">
                        <div className="text-3xl sm:text-4xl font-bold">
                            Welcome Back!
                        </div>
                        <div className="font-normal text-sm sm:text-base text-gray-400">
                            Sign in to your account to access the latest real estate listings.
                        </div>
                    </div>
                    <form 
                        onSubmit={(e) => { e.preventDefault(); LoginUser(); }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl shadow-black/30"
                    >
                        <InputBox
                            onChange={e => setUsername(e.target.value)}
                            label="Username"
                            placeholder="Enter your username"
                            type="text"
                        />
                        <InputBox
                            onChange={e => setPassword(e.target.value)}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        {error && (
                            <div className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            label={loading ? "Signing in…" : "Sign In"}
                            className="w-full py-3 text-base"
                        />
                        <div className="text-sm text-gray-400 text-center">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-white underline font-semibold hover:text-navbar-color transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
