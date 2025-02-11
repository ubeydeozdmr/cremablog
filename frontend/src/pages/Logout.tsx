import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../contexts/UserContext';
import { useLocalStorage } from '../hooks/useStorage';

export default function Logout(): null {
  const [_, __, removeToken] = useLocalStorage('token', '');
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    removeToken();
    toast.success('Logged out successfully');
    navigate('/');
    window.location.reload();
  }, [setUser, removeToken, navigate]);

  return null;
}
