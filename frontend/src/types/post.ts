import { UserProps } from './user';

export interface PostProps {
  _id: string;
  user: UserProps;
  title: string;
  description: string;
  markdown: string;
  thumbnail: string;
  slug: string;
  html: string;
  createdAt: string;
  updatedAt: string;
}
