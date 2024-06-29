import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelpers';

const dbHelper = new DbHelper();

export const addBooking = async (req: Request, res: Response) => {
  try {
    const { userId, tourId, hotelId, bookingDate } = req.body;
    const id = uuidv4();

    await dbHelper.exec('addBooking', { id, userId, tourId, hotelId, bookingDate });

    res.status(201).json({ message: 'Booking added successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await dbHelper.getAll('getBookings');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {`b`
    const booking = await dbHelper.get('getBookingById', { id: req.params['id'] });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    await dbHelper.exec('updateBooking', { id: req.params['id'], status });

    res.json({ message: 'Booking updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    await dbHelper.exec('cancelBooking', { id: req.params['id'] });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
