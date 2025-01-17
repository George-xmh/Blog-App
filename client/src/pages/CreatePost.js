import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); 
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    async function handleCreatePost(ev) {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content); 
        formData.append("image", image);

        const response = await fetch("http://localhost:4000/posts", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Post created successfully!");
            navigate("/");
        } else {
            alert("Failed to create post.");
        }
    }

    return (
        <form className="modern-post-form" onSubmit={handleCreatePost}>
            <h1>Create a New Post</h1>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Content</label>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent} 
                    placeholder="Write your content here..."
                />
            </div>
            <div className="form-group">
                <label>Upload an Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <button type="submit">Publish Post</button>
        </form>
    );
}