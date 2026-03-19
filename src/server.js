import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Global Middleware
app.use(logger);
app.use(express.json({ limit: '100kb' }));
app.use(cors());

//Routes
app.use(notesRoutes);

//404
app.use(notFoundHandler);

//Error handler
app.use(errorHandler);

//MongoDB connection
await connectMongoDB();

//Server statup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
