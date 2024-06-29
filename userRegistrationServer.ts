import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { Pool } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection Pool
const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env['DB_HOST']!,
  user: process.env['DB_USER']!,
  password: process.env['DB_PASSWORD']!,
  database: process.env['DB_DATABASE']!
});

// Route: Register User
app.post('/register', (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Insert into MySQL
  pool.query(
    'INSERT INTO Users (username, email, password, isAdmin, isDeleted, isEmailSent) VALUES (?, ?, ?, ?, ?, ?)',
    [username, email, password, 0, 0, 0],
    (err: any, results: { insertId: any; }) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      console.log('User registered successfully:', results.insertId);
      res.status(200).json({ message: 'User registered successfully', userId: results.insertId });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:$ 3000`);
});
