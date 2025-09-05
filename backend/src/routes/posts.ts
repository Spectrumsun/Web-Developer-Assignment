import { Router, Request, Response } from "express";
import { getPosts, createPost, deletePost } from "../db/posts/posts";
import { Post } from "../db/posts/types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {
  const { user_id, title, body } = req.body;

  if (!user_id || !title || !body) {
     res.status(400).send({ 
      error: "user_id, title and body required" 
    });
    return;
  }

  try {
    const newPost = await createPost({ user_id, title, body });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    if(!postId) {
      res.status(400).send({ error: "postId is required" });
      return;
    }
    await deletePost(postId);
    res.send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete post" });
  }
});

export default router;
