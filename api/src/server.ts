import app from './app';
import dotenv from 'dotenv';
import { initializeDb } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
