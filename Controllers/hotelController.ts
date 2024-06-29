import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelpers';

const dbHelper = new DbHelper();

export const addHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, price } = req.body;
    const id = uuidv4();

    await dbHelper.exec('addHotel', { id, name, location, price });

    res.status(201).json({ message: 'Hotel added successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await dbHelper.getAll('getHotels');
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await dbHelper.get('getHotelById', { id: req.params.id });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, price } = req.body;

    await dbHelper.exec('updateHotel', { id: req.params.id, name, location, price });

    res.json({ message: 'Hotel updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    await dbHelper.exec('deleteHotel', { id: req.params.id });
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
