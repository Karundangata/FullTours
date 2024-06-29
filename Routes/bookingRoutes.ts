import { Router } from 'express';
import { addBooking, getBookings, getBookingById, updateBooking, cancelBooking } from '../Controllers/bookingController';
import { verifyToken, isAdmin, isUserOrAdmin } from '../Middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, addBooking);
router.get('/', verifyToken, isAdmin, getBookings);
router.get('/:id', verifyToken, isUserOrAdmin, getBookingById);
router.put('/:id', verifyToken, isUserOrAdmin, updateBooking);
router.delete('/:id', verifyToken, isUserOrAdmin, cancelBooking);

export default router;
