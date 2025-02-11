import { useEffect, useState, type ReactElement } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import FormInput from '../components/Input';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { deleteSelf, getUserFromToken } from '../services/api';

export default function DeleteAccount(): ReactElement {
  const { user, setUser } = useUser();

  const [token] = useLocalStorage('token', '');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useDocumentTitle('Delete Account');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      getUserFromToken(token).then((response) => {
        if (response.success) {
          setUser(response.data);
        } else {
          console.error(response.message);
          toast.error('An error occurred while fetching user data');
        }
        setLoading(false);
      });
    }
  }, [token, user, setUser]);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = formData.get('password') as string;

    if (!user) return;

    setLoading(true);
    const response = await deleteSelf(token, user._id, password);
    setLoading(false);
    if (response.success) {
      setUser(null);
      navigate('/');
      toast.success('Account deleted successfully');
    } else {
      console.error(response.message);
      toast.error(response.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen p-5">
      <h1 className="text-4xl font-bold text-center">Delete Account</h1>
      <p className="text-lg text-center mt-5">
        Are you sure you want to delete your account? You will lose all your
        data.
      </p>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form
          className="flex flex-col gap-5 mt-10 w-full max-w-xs"
          onSubmit={formSubmitHandler}
        >
          <FormInput
            name="password"
            placeholder="Enter your password for confirmation"
            type="password"
          />
          <Link
            to="/settings"
            className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-red-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-red-500 dark:hover:bg-gray-700"
          >
            Delete Account
          </button>
        </form>
      )}
    </section>
  );
}
