const express = require("express");

const {
    createPost,
    getPosts,
    likePost,
    addComment

} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();
router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.put("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);
module.exports = router;