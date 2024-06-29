import { Router } from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from '../Controllers/authController';
import { verifyToken, isAdmin, isUserOrAdmin } from '../Middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, isAdmin, getUsers);
router.get('/users/:id', verifyToken, isUserOrAdmin, getUserById);
router.put('/users/:id', verifyToken, isUserOrAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

export default router;
