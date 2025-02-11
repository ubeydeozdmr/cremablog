import { type NextFunction, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config/env';
import { type AuthRequest } from '../types/AuthRequest';
import { AppError } from '../utils/error';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    throw new AppError('Unauthorized, no token', 401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded as { id: string };
    next();
  } catch (error) {
    next(new AppError('Unauthorized, invalid or expired token', 401));
  }
};
