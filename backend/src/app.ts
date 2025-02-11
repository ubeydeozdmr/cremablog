import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';

import { expressRateLimitMax, expressRateLimitWindowMin } from './config/env';
import error from './middlewares/error';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import userRoutes from './routes/users';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  rateLimit({
    windowMs: expressRateLimitWindowMin * 60 * 1000,
    max: expressRateLimitMax,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Handling
app.use(error);

export default app;
