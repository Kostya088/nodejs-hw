import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Global Middleware
app.use(logger);
app.use(express.json({ limit: '100kb' }));
app.use(cors());
app.use(cookieParser());

//Routes
app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);

//404
app.use(notFoundHandler);

// validation errors

app.use(errors());

//Error handler
app.use(errorHandler);

//MongoDB connection
await connectMongoDB();

//Server statup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
