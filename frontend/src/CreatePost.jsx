import { useState } from "react";
import API from "./api";
import { jwtDecode } from "jwt-decode";

function CreatePost() {
    const [text, setText] = useState("");

    const createPost = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const username = jwtDecode(token).username;

            await API.post(
                "/posts",
                {
                    username,
                    text
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setText("");
            alert("Post created successfully!");

            window.location.reload();

        } catch (error) {
            alert(error.response?.data?.message || "Failed to create post");
        }
    };

    return (
        <div>
            <h2>Create Post</h2>

            <form onSubmit={createPost}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreatePost;