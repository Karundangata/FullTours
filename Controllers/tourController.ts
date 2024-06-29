import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelpers';

const dbHelper = new DbHelper();

export const addTour = async (req: Request, res: Response) => {
  try {
    const { name, description, price, duration } = req.body;
    const id = uuidv4();

    await dbHelper.exec('addTour', { id, name, description, price, duration });

    res.status(201).json({ message: 'Tour added successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await dbHelper.getAll('getTours');
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await dbHelper.get('getTourById', { id: req.params.id });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const { name, description, price, duration } = req.body;

    await dbHelper.exec('updateTour', { id: req.params.id, name, description, price, duration });

    res.json({ message: 'Tour updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await dbHelper.exec('deleteTour', { id: req.params.id });
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
