import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

import { addPost } from "../controllers/post.controller";

router.post("/", verifyToken, addPost);

export default router;
