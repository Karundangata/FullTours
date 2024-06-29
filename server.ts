import express, { json } from 'express';
import authRoutes from './Routes/authRoutes';
import userRoutes from './Routes/userRoutes';
import tourRoutes from './Routes/tourRoutes';
import hotelRoutes from './Routes/hotelRoutes';
import bookingRoutes from './Routes/bookingRoutes';

const app = express();

// Middlewares
app.use(json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tours', tourRoutes);
app.use('/hotels', hotelRoutes);
app.use('/bookings', bookingRoutes);

// Start server
const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
