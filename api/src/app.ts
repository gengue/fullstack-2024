import express from 'express';
import tourRoutes from './routes/tourRoutes';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/tours', tourRoutes);

export default app;
