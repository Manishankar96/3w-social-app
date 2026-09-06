const Post = require("../models/Post");

const createPost = async (req, res)=>{
    try{
        const{ username, text, image } = req.body;

       if(!text && !image){
        return res.status(400).json({
            message: "Post must contain text or image"
        });
       }
       const post = await Post.create({
        username,
        text,
        image
       });

       res.status(201).json(post);

    } catch(error){
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};

const likePost = async (req, res)=>{
    try{
        const {username} = req.body;
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
            });
        }
        if(post.likes.includes(username)){
            post.likes = post.likes.filter(user => user !== username);
        } else {
            post.likes.push(username);
        }
        await post.save();
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({
            message: "Failed to like post",
            error: error.message
        });
    }
};

const addComment = async (req, res)=>{
    try{
        const {username, text} = req.body;
        
        if(!text){
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        post.comments.push({
            username,
            text
        });

        await post.save();
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({
            message: "Failed to add comment",
            error: error.message
        });
    }
};

    module.exports = {
        createPost,
        getPosts,
        likePost,
        addComment
    };