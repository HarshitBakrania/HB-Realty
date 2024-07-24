import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function NavBar(){
    const navigate = useNavigate();
    const IsLoggedIn = () =>{
        const{currentUser} = useContext(AuthContext);
        if(currentUser){
            return <div className="flex space-x-2">
                <NavBarButtons label="Profile" onClick={() =>{
                navigate("/user");
                }}/>
                <MessageIcon />
            </div> 
        }
        else{
            return <NavBarButtons label="Login" onClick={() =>{
                navigate("/signin");
            }} />
        }
    }
    
    return <div className="flex justify-between p-8 bg-navbar-color">
        <div className="sm:pl-20" onClick={() => navigate("/")}><HomeIcon /></div>
        <div className="sm:pr-10 ">
            <div className="flex justify-end space-x-4 cursor-pointer flex-row">
                <NavBarButtons label="Buy" />
                <NavBarButtons label="Rent" />
                <NavBarButtons label="Contact" />
                <NavBarButtons label="About" />
                <IsLoggedIn />
            </div> 
        </div>
    </div>
}

const HomeIcon = () => {
    return <div className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    </div>  
}

const NavBarButtons = ({label, onClick}) => {
    return (
        <div onClick={onClick} className="no-underline hover:underline">{label}</div>
    )
}

const MessageIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>

}