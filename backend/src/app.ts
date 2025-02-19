import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';

import { appOrigin } from './config/env';
import error from './middlewares/error';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import userRoutes from './routes/users';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: appOrigin, credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running...');
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Error Handling
app.use(error);

export default app;
