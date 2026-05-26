import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import { addPost, getPostByUser } from "../controllers/post.controller";

router.post("/", verifyToken, addPost);
router.get("/:id", verifyToken, getPostByUser);

export default router;
