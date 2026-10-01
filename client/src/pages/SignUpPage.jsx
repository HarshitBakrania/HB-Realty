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
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext)
    
    async function RegisterUser(){
        setLoading(true);
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,{
                username,
                email,
                password
            })
            const login = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
                username,
                password
            },{ withCredentials: true });
            updateUser(login.data);
            navigate("/");
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
                            Create an Account
                        </div>
                        <div className="font-normal text-sm sm:text-base text-gray-400">
                            Join HB Realty and start exploring properties today.
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl shadow-black/30">
                        <InputBox
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            label="Username"
                            placeholder="John_Doe"
                        />
                        <InputBox
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            label="Email"
                            placeholder="john@example.com"
                        />
                        <InputBox
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            label="Password"
                            placeholder="Create a strong password"
                        />
                        {error && (
                            <div className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                {error}
                            </div>
                        )}
                        <Button
                            onClick={RegisterUser}
                            label={loading ? "Creating account…" : "Create Account"}
                            className="w-full py-3 text-base"
                        />
                        <div className="text-sm text-gray-400 text-center">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-white underline font-semibold hover:text-navbar-color transition-colors">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
