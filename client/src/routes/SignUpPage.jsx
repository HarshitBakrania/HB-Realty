import { Link } from "react-router-dom"
import Button from "../components/Button"
import { InputBox } from "../components/InputBox"
import NavBar from "../components/NavBar"

export const SignUpPage = () => {
    return (
        <div className="bg-background-color h-[100vh] text-white">
            <NavBar />
            <div className="text-center pt-20 space-y-2">
                <div className="text-3xl font-bold">
                    Register
                </div>
                <div className="font-normal text-lg">
                Create your account to get started
                </div>
            </div>
            <div className="bg-secondary-color border-1 max-w-md mx-auto mt-6 p-6 space-y-3 rounded-lg">
                <InputBox type="text" label="Username" placeholder="John_Doe" />
                <InputBox type="email" label="Email" placeholder="john@example.com" />
                <InputBox type="password" label="Password" placeholder="***********" />
                <Button label="Register" />
                <div>
                    Already have an account?
                    <Link to="/login" className="underline pl-2 font-semibold">Login</Link>
                </div>
            </div>
        </div>
    )
}