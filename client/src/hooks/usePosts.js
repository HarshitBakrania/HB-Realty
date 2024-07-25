import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const controller = new AbortController();

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts`, {
                    params: Object.fromEntries(searchParams),
                    signal: controller.signal
                });
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('Error fetching posts:', error);
                    setLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            controller.abort();
        };
    }, [searchParams]);

    return {
        loading,
        posts
    };
};