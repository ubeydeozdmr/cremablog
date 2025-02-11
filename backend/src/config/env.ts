import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const nodeEnv = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 5000;
export const expressRateLimitWindowMin = Number.isInteger(
  Number(process.env.EXPRESS_RATE_LIMIT_WINDOW_MINUTES),
)
  ? Number(process.env.EXPRESS_RATE_LIMIT_WINDOW_MINUTES)
  : 15;
export const expressRateLimitMax = Number.isInteger(
  Number(process.env.EXPRESS_RATE_LIMIT_MAX),
)
  ? Number(process.env.EXPRESS_RATE_LIMIT_MAX)
  : 1000;
export const mongodbUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cremablog';
export const jwtSecret = process.env.JWT_SECRET || 'secret';
export const jwtExpiresIn = parseInt(process.env.JWT_EXPIRES_IN || '30', 10);

export default {
  nodeEnv,
  port,
  expressRateLimitWindowMin,
  expressRateLimitMax,
  mongodbUri,
  jwtSecret,
  jwtExpiresIn,
};
