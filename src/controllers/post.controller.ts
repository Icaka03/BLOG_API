import { Response, Request } from "express";
import prisma from "../lib/prisma";

export const addPost = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    res.status(400).json({
      success: false,
      message: "missing content",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "not found user",
    });
    return;
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  });

  res.status(201).json({ success: true, message: "post created", data: post });
};

export const getPostByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { posts: true },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "user not found",
    });
    return;
  }

  if (user.posts.length === 0) {
    res.status(400).json({
      success: true,
      message: "user does not have any posts",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: user.posts,
  });
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    res.status(400).json({
      success: false,
      message: "not found post",
    });
    return;
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, content },
  });

  res.status(200).json({
    success: true,
    data: updatedPost,
    message: "post updated",
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    res.status(400).json({
      success: false,
      message: "not found post",
    });
    return;
  }

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    success: true,
    data: deletedPost,
    message: "post deleted",
  });
};
