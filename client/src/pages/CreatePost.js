import { useState } from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

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
                <textarea
                    placeholder="Write your content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
