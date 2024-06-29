import { Router } from 'express';
import { addTour, getTours, getTourById, updateTour, deleteTour } from '../Controllers/tourController';
import { verifyToken, isAdmin } from '../Middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, isAdmin, addTour);
router.get('/', verifyToken, getTours);
router.get('/:id', verifyToken, getTourById);
router.put('/:id', verifyToken, isAdmin, updateTour);
router.delete('/:id', verifyToken, isAdmin, deleteTour);

export default router;
