import { type NextFunction, type Request, type Response } from 'express';

import Post from '../models/Post';
import { AppError } from '../utils/error';
import { AuthRequest } from '../types/AuthRequest';
import User from '../models/User';

async function isUserAdmin(userId: string | undefined) {
  const user = await User.findById(userId);
  return user?.role === 'admin';
}

export const readPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await Post.find(
      req.query.title
        ? { title: { $regex: req.query.title as string, $options: 'i' } }
        : {},
    )
      .sort({ createdAt: -1 })
      .populate('user', 'username fullName avatar');
    res.status(200).json({
      success: true,
      data: posts.map((post) => ({
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        slug: post.slug,
        html: post.html,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const readPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      'user',
      'username fullName avatar',
    );
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json({
      success: true,
      data: {
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        slug: post.slug,
        html: post.html,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, markdown, thumbnail } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Unauthorized, User ID is required', 401);
    }

    const post = new Post({
      title,
      description,
      markdown,
      thumbnail,
      user: userId,
    });
    await post.save();
    res.status(201).json({
      success: true,
      data: {
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        slug: post.slug,
        html: post.html,
        createdAt: post.createdAt,
        updatePost: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, markdown, thumbnail } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Unauthorized, User ID is required', 401);
    }

    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      res.status(404);
      throw new AppError('Post not found', 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError(
        'Unauthorized, you do not have permission to update this post',
        403,
      );
    }

    post.title = title;
    post.description = description;
    post.markdown = markdown;
    post.thumbnail = thumbnail;
    await post.save();
    res.status(200).json({
      success: true,
      data: {
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        slug: post.slug,
        html: post.html,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;

    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      res.status(404);
      throw new AppError('Post not found', 404);
    }

    if (post.user.toString() !== userId && !(await isUserAdmin(userId))) {
      throw new AppError(
        'Unauthorized, you do not have permission to delete this post',
        403,
      );
    }

    await post.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  readPosts,
  readPost,
  createPost,
  updatePost,
  deletePost,
};
