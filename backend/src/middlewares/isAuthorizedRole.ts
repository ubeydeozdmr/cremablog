import { type NextFunction, type Response } from 'express';

import User from '../models/User';
import { type AuthRequest } from '../types/AuthRequest';
import { AppError } from '../utils/error';

type Role = 'user' | 'editor' | 'admin';

export const isAuthorizedRole = (roles: Role[], acceptOwner?: boolean) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    User.findById(req.user.id)
      .then((user) => {
        if (!user) {
          throw new AppError('User not found', 404);
        }

        if (acceptOwner && req.params.id === req.user?.id) {
          next();
          return;
        }

        if (!roles.includes(user.role as Role)) {
          throw new AppError('Forbidden: You do not have permission', 403);
        }

        next();
      })
      .catch(next);
  };
};
