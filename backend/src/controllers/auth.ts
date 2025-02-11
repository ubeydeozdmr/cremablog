import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtExpiresIn, jwtSecret } from '../config/env';
import User from '../models/User';
import { AppError } from '../utils/error';
import { comparePassword, hashPassword } from '../utils/hash';

export const updateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid password', 400);
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new AppError('Email already exists', 400);
    }
    user.email = email;
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

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.params.id).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid password', 400);
    }
    if (newPassword.length < 6) {
      throw new AppError('New password must be at least 6 characters', 400);
    }
    user.password = await hashPassword(newPassword);
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

export const deleteSelf = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid password', 400);
    }
    await user.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiresIn * 86400,
    });
    res.status(200).json({
      success: true,
      token,
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

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiresIn * 86400,
    });
    res.status(201).json({
      success: true,
      token,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError('Unauthorized, Token is required', 401);
    }
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    const user = await User.findById(decoded.id);
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

export default {
  updateEmail,
  updatePassword,
  deleteSelf,
  loginUser,
  registerUser,
  getUserFromToken,
};
