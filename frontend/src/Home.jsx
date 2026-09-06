import { useEffect, useState } from "react";
import API from "./api";
import { jwtDecode } from "jwt-decode";


function Home() {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState({});

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await API.get("/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const likePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            await API.put(
                `/posts/${postId}/like`,
                { username: jwtDecode(token).username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchPosts();
        } catch (error) {
            console.error("Failed to like post", error);
        }
    };

    const addComment = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            const username = jwtDecode(token).username;

            await API.post(
                `/posts/${postId}/comment`,
                {
                    username,
                    text: commentText[postId]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCommentText({
                ...commentText,
                [postId]: ""
            });

            fetchPosts();
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    return (
        <div>
            <h2>3W Social Feed</h2>

            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.username}</h3>

                    <p>{post.text}</p>

                    <button onClick={() => likePost(post._id)}>
                        ❤️ {post.likes.length}
                    </button>

                    <h4>Comments</h4>

                    {post.comments.map((comment, index) => (
                        <p key={index}>
                            <b>{comment.username}:</b> {comment.text}
                        </p>
                    ))}

                    <input
                        type="text"
                        placeholder="Write a comment"
                        value={commentText[post._id] || ""}
                        onChange={(e) =>
                            setCommentText({
                                ...commentText,
                                [post._id]: e.target.value
                            })
                        }
                    />

                    <button onClick={() => addComment(post._id)}>
                        Comment
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Home;