import mongoose from 'mongoose';
import { mongodbUri } from './env';

const connectDB = async () => {
  try {
    if (!mongodbUri) {
      throw new Error('MongoDB URI is required');
    }
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongodbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
