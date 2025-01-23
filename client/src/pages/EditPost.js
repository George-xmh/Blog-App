import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:4000/posts/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                alert('Post updated successfully!');
                navigate('/');
            } else {
                alert('Failed to update post');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="edit-post-container">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} className="edit-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload New Image (optional)</label>
                    <input
                        id="image"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="update-button">
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default EditPost;
