import { useState, useEffect } from "react";
import axios from "axios";

export const useUserPosts = () =>{
    const[loading, setLoading] = useState(true);
    const[posts, setPosts] = useState([]);

    useEffect(() =>{
        const fetchPosts = async () =>{
            try{
                const response = await axios.get("http://localhost:3000/api/users/userPosts",{
                    withCredentials: true
                })
                setPosts(response.data);
                setLoading(false);
            }catch(error){
                console.log(error)
            }
        }
        fetchPosts();
    },[])

    return{
        posts,
        loading
    }
}