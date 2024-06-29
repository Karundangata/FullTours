import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Tazama'
});

// Get all hotels
app.get('/api/hotels', (req: Request, res: Response) => {
  pool.query('SELECT * FROM Hotels', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(results);
  });
});

// Add a new hotel
app.post('/api/hotels', (req: Request, res: Response) => {
  const { name, location, rating, price, imageUrl } = req.body;
  pool.query('INSERT INTO Hotels (name, location, rating, price, imageUrl) VALUES (?, ?, ?, ?, ?)', [name, location, rating, price, imageUrl], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    // res.send({ id: results.insertId });
  });
});

// Update a hotel
app.put('/api/hotels/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location, rating, price, imageUrl } = req.body;
  pool.query('UPDATE Hotels SET name = ?, location = ?, rating = ?, price = ?, imageUrl = ? WHERE id = ?', [name, location, rating, price, imageUrl, id], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    // res.send({ affectedRows: results.affectedRows });
  });
});

// Delete a hotel
app.delete('/api/hotels/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query('DELETE FROM Hotels WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    // res.send({ affectedRows: results.affectedRows });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
