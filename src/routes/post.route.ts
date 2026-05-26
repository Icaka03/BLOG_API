import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import {
  addPost,
  getPostByUser,
  editPost,
  deletePost,
} from "../controllers/post.controller";

router.post("/", verifyToken, addPost);
router.get("/:id", verifyToken, getPostByUser);
router.put("/:id", verifyToken, editPost);
router.delete("/:id", verifyToken, deletePost);
export default router;
