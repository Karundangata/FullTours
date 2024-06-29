import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../Controllers/authController';
import { verifyToken, isAdmin } from '../Middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, isAdmin, getUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;
