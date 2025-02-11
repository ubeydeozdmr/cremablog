import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtExpiresIn, jwtSecret } from '../config/env';
import User from '../models/User';
import { AppError } from '../utils/error';
import { comparePassword, hashPassword } from '../utils/hash';

export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users.map((user) => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        fullName: user.fullName,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(error);
  }
};

type UserUpdateRequestParams = { id: string };
type UserUpdateRequestBody = Partial<{
  fullName: string;
  bio: string;
  avatar: string;
}>;

export const updateUser = async (
  req: Request<UserUpdateRequestParams, UserUpdateRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, bio, avatar } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    await user.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  readUsers,
  readUser,
  updateUser,
  deleteUser,
};
