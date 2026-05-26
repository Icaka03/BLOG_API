import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const addComment = async (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content) {
    res.status(400).json({
      success: false,
      message: "missing fields",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "not existing user",
    });
    return;
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });

  if (!post) {
    res.status(400).json({
      success: false,
      message: "not existing post",
    });
    return;
  }

  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorId: Number(userId),
      postId: Number(postId),
    },
  });

  res.status(200).json({
    success: true,
    message: "comment created",
    data: comment,
  });
};

export const getAllComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany();

  res.status(200).json({
    success: true,
    data: comments,
  });
};
