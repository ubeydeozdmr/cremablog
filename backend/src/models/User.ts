import { model, Schema, type Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'editor', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

const User = model<UserDocument>('User', userSchema);

export default User;
