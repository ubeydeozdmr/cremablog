import dotenv from 'dotenv';

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 5000;
export const appOrigin = process.env.APP_ORIGIN || 'http://localhost:3000';
export const mongodbUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cremablog';
export const jwtSecret = process.env.JWT_SECRET || 'secret';
export const jwtExpiresIn = parseInt(process.env.JWT_EXPIRES_IN || '30', 10);

export default {
  nodeEnv,
  port,
  mongodbUri,
  jwtSecret,
  jwtExpiresIn,
};
