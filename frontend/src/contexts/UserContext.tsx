import {
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { UserProps } from '../types/user';

type UserContextType = {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps): ReactElement {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
