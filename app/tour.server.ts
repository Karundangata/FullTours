import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env['DB_HOST'] as string,
  user: process.env['DB_USER'] as string,
  password: process.env['DB_PASSWORD'] as string,
  database: process.env['DB_DATABASE'] as string
});

// Get all tours
app.get('/tours', (req: Request, res: Response) => {
  pool.query('SELECT * FROM Tours', (err, results) => {
    if (err) {
      console.error('Error fetching tours:', err);
      return res.status(500).json({ message: 'Error fetching tours' });
    }
    res.json(results);
  });
});

// Add a new tour
app.post('/tours', (req: Request, res: Response) => {
  const { name, description, price, imageUrl } = req.body;
  pool.query(
    'INSERT INTO Tours (name, description, price, imageUrl) VALUES (?, ?, ?, ?)',
    [name, description, price, imageUrl],
    (err, results) => {
      if (err) {
        console.error('Error adding tour:', err);
        return res.status(500).json({ message: 'Error adding tour' });
      }
      const newTour = { id: results.insertId, name, description, price, imageUrl };
      res.status(201).json(newTour);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
