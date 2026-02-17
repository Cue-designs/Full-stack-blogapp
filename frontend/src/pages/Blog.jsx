import BlogPage from "../components/BlogPage"
import { FaTimes } from "react-icons/fa"
import { useState, useEffect } from "react"  
import axios from "axios"

const Blog = (  ) => {
const [search, setsearch] = useState("")
const [posts, setPosts] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:3500/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3500/posts?title_like=${search}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [search]);

  return (
    <>
       <section className="relative  ">
        <nav className=" px-8  lg:px-64  "><input type="search" 
        name="" 
        className=" text-purple-800 bg-green-200 px-4  font-bold py-2  flex grow shrink w-full items-center rounded-4xl    "
        id="searching" 
        onSubmit={(e)=> e.preventDefault()}
        value={search}
        placeholder="Search post"
        onChange={(e)=>setsearch(e.target.value)}
        />   

        </nav>
        <section className="px-8 lg:px-58 py-4">
          {
            posts.length > 0 ?(
             <section className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {posts.map((post, idx) => (
                  <BlogPage key={idx} post={post} />
                   ))}
             </section>
            ) :(
              <article className="flex min-h-[80vh] items-center justify-center  lg:px-24 gap-4">
                <p className="text-2xl text-center font-bold lg:text-4xl ">Sorry There is no blog Post available yet <FaTimes className="text-red-800 text-4xl justify-start items-start inline " /> </p>
              </article>
            )
          }

        </section>






        {/* const addNewPost = async () => {
            const newPost = {
              title: <postTitleFromState>,
              body: <postBodyFromState>,
              datetime: <currentDateTime>
            };

            try {
              // json-server will automatically assign a new ID
              const res = await axios.post('http://localhost:3001/posts', newPost);
              console.log("Saved to file:", res.data);
            } catch (err) {
              console.error("Failed to write to file", err);
            }
          }; */}
       </section> 
    </>
  )
}

export default Blog
