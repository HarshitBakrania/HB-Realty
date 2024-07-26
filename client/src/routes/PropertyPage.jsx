import Bookmark from "../components/Bookmark"
import Button from "../components/Button"
import MapPin from "../components/MapPin"
import NavBar from "../components/NavBar"
import TextIcon from "../components/TextIcon"
import { useNavigate, useParams } from "react-router-dom"
import { usePost } from "../hooks/usePost"
import DOMPurify from 'dompurify';
import { Map } from "../components/Map"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

export const PropertyPage = () =>{
    const { id } = useParams();
    const { post, loading } = usePost({id});
    const {currentUser} = useContext(AuthContext);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        if(!loading && post){
            setSaved(post.isSaved || false);
        }
    },[loading, post]);

    const savePost = async() =>{
        setSaved((prev) => !prev);
        if(!currentUser){
            navigate("/signin")
        }
        try{
            await axios.post("http://localhost:3000/api/users/save", {postId: post.id},{
                withCredentials: true
            });
            
        }catch(error){
            console.log(error)
            setSaved((prev) => !prev);
        }
    }
    //TODO: add loading skeleton
    if (loading) return <div>Loading...</div>;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            <NavBar />
            <div className="bg-background-color h-screen grid grid-cols-3 text-white">
                <div className="col-span-2 px-40 py-10 space-y-2 border-r border-slate-600">
                    <div className="py-10">
                        <img src="https://images.pexels.com/photos/276625/pexels-photo-276625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-96"/>
                    </div>
                    <div className="text-3xl font-bold grid grid-cols-4">
                        <div className="col-span-3">{post.title}</div> 
                        <div className="col-span-1 flex items-center">
                            {post.user.username}
                            <img src={post.user.avatar} className="rounded-full ml-5" />
                        </div>
                    </div>
                    <div className="flex">
                        <MapPin />
                        {post.address}
                    </div>
                    <div className="text-2xl">
                        $ {post.price}
                    </div>
                    <div className="text-xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.description) }}>
                    </div>
                </div>
                <div className="col-span-1 px-14 py-10">
                    <div className="text-2xl font-semibold">
                        General
                    </div>
                    <div className="text-white grid grid-cols-2 font-semibold text-xl bg-secondary-color p-5 rounded-lg mt-2">
                            <div className="space-y-4">
                                <div className="flex"><CheckCircle />{capitalizeFirstLetter(post.type)}</div>
                                <div className="flex"><CheckCircle />{capitalizeFirstLetter(post.property)}</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex"><CheckCircle />{post.postDetail.utilities === "Yes" ? "Furnished" : "Not Furnished"}</div>
                                <div className="flex"><CheckCircle />Pets {post.postDetail.pet}</div>
                            </div>
                    </div>
                    <div className="py-10 text-2xl font-semibold">
                        Features
                        <div className="bg-secondary-color text-xl p-5 space-y-6 rounded-xl mt-2">
                            <div>{post.postDetail.size}sq feet</div>
                            <div>{post.bedroom} Bedrooms</div>
                            <div>{post.bathroom} Bathrooms</div>
                        </div>
                    </div>
                    <div className="text-2xl font-semibold">
                        Nearby Places
                        <div className="bg-secondary-color text-xl grid grid-cols-3 p-5">
                            <div className="col-span-1">
                                <div>School</div>
                                <div className="text-xs font-thin">{post.postDetail.school > 999 ? post.postDetail.school/1000 +"km" : post.postDetail.school +"m"} away</div>
                            </div>
                            <div className="col-span-1">
                                <div>Hospitals</div>
                                <div className="text-xs font-thin">{post.postDetail.hospital > 999 ? post.postDetail.hospital/1000 +"km" : post.postDetail.hospital +"m"} away</div>
                            </div>
                            <div className="col-span-1"> 
                                <div>Restaurants</div>
                                <div className="text-xs font-thin">{post.postDetail.restaurant > 999 ? post.postDetail.restaurant/1000 +"km" : post.postDetail.restaurant +"m"} away</div>
                            </div>      
                        </div>
                    </div>
                    <div className="mt-10 h-96">
                        Location
                        <Map items={[post]} />
                    </div>
                    <div className="flex justify-between p-10">
                        <div className="flex">
                            <Button label="Send a message">
                                <TextIcon />
                            </Button>
                        </div>
                        <div className="flex">
                            <Button label={saved ? "Place is saved" : "Save Place"} onClick={savePost} >
                                <Bookmark />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckCircle = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
}