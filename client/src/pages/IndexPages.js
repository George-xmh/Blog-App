import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully!");
    } else {
      alert("Failed to delete post");
    }
  };

  return (
    <div>
      <h1>My Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-image">
            <img
              src={`http://localhost:4000/uploads/${post.image}`}
              alt={post.title}
            />
          </div>
          <div className="post-content">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="post-actions">
              <button
                className="edit"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
