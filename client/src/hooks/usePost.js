import axios from "axios";
import { useEffect, useState } from "react"

export const usePost = ({id}) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState("");

    useEffect(() =>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,{
            withCredentials: true
        }) 
        .then((res) => {
            setPost(res.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    },[id])

    
    return {
        loading,
        post
    };
}