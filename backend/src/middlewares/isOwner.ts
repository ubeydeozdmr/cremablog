import { type NextFunction, type Response } from 'express';

import { type AuthRequest } from '../types/AuthRequest';
import { AppError } from '../utils/error';

export const isOwner = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  if (req.user.id !== id) {
    throw new AppError('Forbidden: You can only update your own account', 403);
  }

  next();
};
