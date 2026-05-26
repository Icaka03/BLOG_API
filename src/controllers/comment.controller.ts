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

export const getCommentsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const postComments = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { comment: true },
  });

  if (!postComments) {
    res.status(400).json({
      success: false,
      message: "not found post",
    });
  }

  res.status(200).json({
    success: true,
    data: postComments,
  });
};

export const editComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });

  if (!comment) {
    res.status(400).json({
      success: false,
      message: "not found comment",
    });
    return;
  }

  const updateComment = await prisma.comment.update({
    where: { id: Number(id) },
    data: { content },
  });

  res.status(200).json({
    success: true,
    data: updateComment,
    message: "comment updated",
  });
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });

  if (!comment) {
    res.status(400).json({
      success: false,
      message: "not found comment",
    });
    return;
  }

  const deleteComment = await prisma.comment.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    success: true,
    data: deleteComment,
    message: "comment deleted",
  });
};
