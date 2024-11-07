import app from './app';
import { initializeDb } from './config/db';

const PORT = process.env.PORT || 3000;

initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
