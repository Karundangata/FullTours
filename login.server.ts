
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

// Route: User Login
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Query to check if user exists with provided credentials
  pool.query(
    'SELECT * FROM Users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Error authenticating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // User authenticated successfully
      res.status(200).json({ message: 'Login successful', user: results[0] });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
