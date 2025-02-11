export const roles = ['admin', 'editor', 'user'] as const;

export interface UserInfoProps {
  avatar?: string;
  bio?: string;
  fullName?: string;
}

export interface UserAuthProps {
  email: string;
  password: string;
}

export interface UserProps {
  _id: string;
  username: string;
  email: string;
  role: (typeof roles)[number];
  avatar?: string;
  bio?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

// export interface UserContextProps {
//   user: UserProps | null;
//   setUser: (user: UserProps | null) => void;
// }
