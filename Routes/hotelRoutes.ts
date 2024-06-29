import { Router } from 'express';
import { addHotel, getHotels, getHotelById, updateHotel, deleteHotel } from '../Controllers/hotelController';
import { verifyToken, isAdmin } from '../Middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, isAdmin, addHotel);
router.get('/', verifyToken, getHotels);
router.get('/:id', verifyToken, getHotelById);
router.put('/:id', verifyToken, isAdmin, updateHotel);
router.delete('/:id', verifyToken, isAdmin, deleteHotel);

export default router;
