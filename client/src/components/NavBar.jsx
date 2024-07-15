import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function NavBar(){
    const navigate = useNavigate();
    const IsLoggedIn = () =>{
        const{currentUser} = useContext(AuthContext);
        console.log(currentUser);
        if(currentUser){
            return <NavBarButtons label="Profile" onClick={() =>{
                navigate("/user");
            }}/>
        }
        else{
            return <NavBarButtons label="Login" onClick={() =>{
                navigate("/signin");
            }} />
        }
    }
    

    return <div className="flex justify-between p-8 bg-navbar-color">
        <div className="sm:pl-20 "><HomeIcon /></div>
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
