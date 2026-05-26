import express from "express";
import cors from "cors";
import helmet from "helmet";

// import routes
import commentRoutes from "./routes/comment.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.route";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middleware
app.use(express.json()); // parses incoming JSON body
app.use(cors()); // allows cross-origin requests
app.use(helmet()); // sets secure headers

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);

export default app;
