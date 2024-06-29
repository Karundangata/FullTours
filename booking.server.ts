import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env['PORT'] || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env['DB_HOST'] as string,
  user: process.env['DB_USER'] as string,
  password: process.env['DB_PASSWORD'] as string,
  database: process.env['DB_DATABASE'] as string
});

// Get all bookings
app.get('/bookings', (req: Request, res: Response) => {
  pool.query('SELECT * FROM Bookings', (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Error fetching bookings' });
    }
    res.json(results);
  });
});

// Add a new booking
app.post('/bookings', (req: Request, res: Response) => {
  const { userId, tourId, hotelId, bookingDate } = req.body;
  pool.query(
    'INSERT INTO Bookings (userId, tourId, hotelId, bookingDate) VALUES (?, ?, ?, ?)',
    [userId, tourId, hotelId, bookingDate],
    (err, results) => {
      if (err) {
        console.error('Error adding booking:', err);
        return res.status(500).json({ message: 'Error adding booking' });
      }
      // Assuming results.insertId is the newly inserted ID in the database
      const newBooking = { id: results.insertId, userId, tourId, hotelId, bookingDate };
      res.status(201).json(newBooking);
    }
  );
});

// Update a booking
app.put('/bookings/:id', (req: Request, res: Response) => {
  const { userId, tourId, hotelId, bookingDate } = req.body;
  const bookingId = req.params['id'];
  pool.query(
    'UPDATE Bookings SET userId = ?, tourId = ?, hotelId = ?, bookingDate = ? WHERE id = ?',
    [userId, tourId, hotelId, bookingDate, bookingId],
    (err, results) => {
      if (err) {
        console.error('Error updating booking:', err);
        return res.status(500).json({ message: 'Error updating booking' });
      }
      res.status(200).json({ message: 'Booking updated successfully' });
    }
  );
});

// Delete a booking
app.delete('/bookings/:id', (req: Request, res: Response) => {
  const bookingId = req.params['id'];
  pool.query('DELETE FROM Bookings WHERE id = ?', [bookingId], (err, results) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ message: 'Error deleting booking' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
