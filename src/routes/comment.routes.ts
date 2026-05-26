import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import { addComment, getAllComments } from "../controllers/comment.controller";

router.post("/", verifyToken, addComment);
router.get("/", getAllComments);
export default router;
