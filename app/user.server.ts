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

// Get all users
app.get('/users', (req: Request, res: Response) => {
  pool.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.json(results);
  });
});

// Add a new user
app.post('/users', (req: Request, res: Response) => {
  const { username, email, password, name } = req.body;
  pool.query(
    'INSERT INTO Users (username, email, password, name) VALUES (?, ?, ?, ?)',
    [username, email, password, name],
    (err, results) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ message: 'Error adding user' });
      }
      const newUser = { id: results.insertId, username, email, password, name };
      res.status(201).json(newUser);
    }
  );
});

// Update a user
app.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, name } = req.body;
  pool.query(
    'UPDATE Users SET username = ?, email = ?, password = ?, name = ? WHERE id = ?',
    [username, email, password, name, id],
    (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Error updating user' });
      }
      res.json({ id, username, email, password, name });
    }
  );
});

// Delete a user
app.delete('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query('DELETE FROM Users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user' });
    }
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
