// src/components/postForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = { title, content };

        axios.post('http://localhost:5000/posts', newPost)
            .then(response => {
                console.log('Post created successfully', response.data);
                setTitle('');
                setContent('');
            })
            .catch(error => console.error('There was an error creating the post!', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
}

export default PostForm;
