import { type ReactElement, type ReactNode, useEffect } from 'react';

import { useUser } from './contexts/UserContext';
import { useLocalStorage } from './hooks/useStorage';
import { getUserFromToken } from './services/api';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({
  children,
}: AuthProviderProps): ReactElement {
  const [token] = useLocalStorage('token', '');
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token, setUser]);

  useEffect(() => {
    if (token && !user) {
      getUserFromToken(token)
        .then((response) => {
          if (response.success) {
            setUser(response.data);
          } else {
            console.error(response.message);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [token, user, setUser]);

  return <>{children}</>;
}
