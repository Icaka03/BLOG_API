import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import {
  addComment,
  getAllComments,
  getCommentsById,
  editComment,
  deleteComment,
} from "../controllers/comment.controller";

router.post("/", verifyToken, addComment);
router.get("/", getAllComments);
router.get("/:id", getCommentsById);
router.put("/:id", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);
export default router;
