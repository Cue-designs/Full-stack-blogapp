import { Link } from "react-router-dom";
const BlogPage = ({post}) => {

  return (
    <div className=" ">
        <section className="text-purple-50 bg-green-700 p-4 rounded-md shadow-md">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.datetime}</p>
            </Link>
            {
                (post.body).length <= 25 ? (
                    <p>{post.body}</p>
                ) : (
                    <p>{`${(post.body).slice(0, 25)}.....`}</p>
                )
            } 

        </section>
    </div>
  );

};

export default BlogPage;