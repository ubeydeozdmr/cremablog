import { Router } from 'express';

import controller from '../controllers/users';
import { authMiddleware } from '../middlewares/checkAuth';
import { isAuthorizedRole } from '../middlewares/isAuthorizedRole';
import { isOwner } from '../middlewares/isOwner';

const router = Router();

router.get(
  '/',
  authMiddleware,
  isAuthorizedRole(['admin']),
  controller.readUsers,
);
router.get(
  '/:id',
  authMiddleware,
  isAuthorizedRole(['admin'], true),
  controller.readUser,
);
router.patch('/:id', authMiddleware, isOwner, controller.updateUser);
router.delete(
  '/:id',
  authMiddleware,
  isAuthorizedRole(['admin']),
  controller.deleteUser,
);

export default router;
