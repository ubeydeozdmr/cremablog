import app from './app';
import connectDB from './config/db';
import { port } from './config/env';

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
