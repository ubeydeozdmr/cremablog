import { Router } from 'express';

import controller from '../controllers/posts';
import { authMiddleware } from '../middlewares/checkAuth';
import { isAuthorizedRole } from '../middlewares/isAuthorizedRole';

const router = Router();

router.get('/', controller.readPosts);
router.get('/:slug', controller.readPost);
router.post(
  '/',
  authMiddleware,
  isAuthorizedRole(['editor', 'admin']),
  controller.createPost,
);
router.patch('/:slug', authMiddleware, controller.updatePost);
router.delete('/:slug', authMiddleware, controller.deletePost);

export default router;
