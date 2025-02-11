import { Router } from 'express';

import controller from '../controllers/auth';
import { authMiddleware } from '../middlewares/checkAuth';
import { isOwner } from '../middlewares/isOwner';

const router = Router();

router.get('/me', authMiddleware, controller.getUserFromToken);
router.post(
  '/update-email/:id',
  authMiddleware,
  isOwner,
  controller.updateEmail,
);
router.post(
  '/update-password/:id',
  authMiddleware,
  isOwner,
  controller.updatePassword,
);
router.post(
  '/delete-account/:id',
  authMiddleware,
  isOwner,
  controller.deleteSelf,
);
router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);

export default router;
