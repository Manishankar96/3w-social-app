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
            setPosts(response);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const likePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            const decoded = jwtDecode(token);
            const username = decoded.username;

            const updatedPost = await API.put(
                `/posts/${postId}/like`,
                {
                    username: username
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post._id === postId ? updatedPost : post
                )
            );

        } catch (error) {
            console.error("Like error:", error);
            alert(error.message || "Failed to like post");
        }
    };

    const addComment = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            const decoded = jwtDecode(token);
            const username = decoded.username;

            await API.post(
                `/posts/${postId}/comment`,
                {
                    username: username,
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

            await fetchPosts();

        } catch (error) {
            console.error("Comment error:", error);
            alert(error.message || "Failed to add comment");
        }
    };

    return (
        <div>
            <h2>3W Social Feed</h2>

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id}>

                        <h3>{post.username}</h3>

                        <p>{post.text}</p>

                        <button onClick={() => likePost(post._id)}>
                            ❤️ {post.likes ? post.likes.length : 0}
                        </button>

                        <h4>Comments</h4>

                        {post.comments &&
                            post.comments.map((comment, index) => (
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
                ))
            )}
        </div>
    );
}

export default Home;