import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {

    const {id} = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        if (id) {
            console.log(id);
            axios.get(`http://localhost:3500/posts/${id}`)
            .then((res) => {
                setPost(res.data); // Axios places data in res.data
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
       
   }, []);
    return (
        <section className="text-lime-50 min-h-[70vh] p-4 lg:px-24"> 
            <h2 className="py-12 text-2xl font-bold text-center">{post?.title}</h2>
            <p className="px-4 ">{post?.body}</p>
            <p className="py-8 px-4">{post?.datetime}</p>

        </section>
    );



};

export default ArticlePage;