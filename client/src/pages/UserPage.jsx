import { useContext } from "react";
import Button from "../components/Button"
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import NavBar from "../components/NavBar";
import { useUserPosts } from "../hooks/useUserPosts";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

export const UserPage = () =>{
    const { posts, loading} = useUserPosts();
    const userPosts = posts.userPosts;
    const savedPosts = posts.savedPosts;
    const {updateUser, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    if(!currentUser){
        return <Navigate to="/signin"/>
    }
    async function LogoutUser(){
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
            },{
                withCredentials: true
            });
            updateUser(null);
            navigate("/")
        }catch(error){
            console.log(error)
        }  
    }
    
    return(
        <div>
            <NavBar/>
            <div className="text-white grid grid-cols-4 bg-background-color">
                <div className="col-span-3">
                    <div className="py-16 px-24 flex justify-between">
                        <div className="text-4xl font-semibold">
                            Your Listings
                        </div>
                        <Button label="Create New Listing" className="text-lg" onClick={() =>{
                            navigate("/posts/create")
                        }}/>
                    </div>
                    <div className="mx-24 mt-8 mb-28 space-y-12">
                        {userPosts ? userPosts.map(item => (
                            <PropertyCard key={item.id} item={item} />
                        )) : null}
                    </div>
                    <div className="text-4xl font-semibold mx-24 pb-6 pt-12 border-t border-slate-800">
                        Saved Posts
                    </div>
                    <div className="mx-24 mt-8 mb-36 space-y-12">
                        {savedPosts ? savedPosts.map(item => (
                            <PropertyCard key={item.id} item={item} />
                        )): null}
                    </div>
                </div> 
                <div className="col-span-1 bg-secondary-color max-h-max p-10 space-y-5 m-10">
                    <div className="flex justify-between">
                        <div className="text-3xl font-bold">
                            Account Information
                        </div>
                        <Button label="Update Profile" onClick={() => navigate("/user/update")} />
                    </div>
                    <div className="text-xl font-semibold">
                        <div className="flex">
                            <div className="py-6">Avatar: </div>
                            {currentUser.avatar ? <img src ={currentUser.avatar} className="rounded-full size-20 ml-4" /> : null}
                        </div>
                        <div className="pt-4">
                            Username: {currentUser.username}
                        </div>
                        <div className="py-6">
                            Email Address: {currentUser.email}
                        </div>
                        <div className="max-w-24 pt-2 font-normal">
                            <Button label="Logout" onClick={LogoutUser} />
                        </div>      
                    </div>
                </div>         
            </div>
            <Footer/>    
        </div>
    )
}

