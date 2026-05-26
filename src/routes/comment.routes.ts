import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import {
  addComment,
  getAllComments,
  getCommentsById,
} from "../controllers/comment.controller";

router.post("/", verifyToken, addComment);
router.get("/", getAllComments);
router.get("/:id", getCommentsById);
export default router;
