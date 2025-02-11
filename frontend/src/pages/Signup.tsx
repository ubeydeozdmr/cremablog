import { type FormEvent, type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { signup } from '../services/api';
import { LoginResponseSuccess } from '../types/response';

export default function Signup(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [preventHook, setPreventHook] = useState<boolean>(false);
  const [_, setToken] = useLocalStorage('token', '');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !preventHook) {
      navigate('/');
    }
  }, [user, navigate]);

  useDocumentTitle('Sign up');

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const username = (
      e.currentTarget.elements.namedItem('username') as HTMLInputElement
    ).value;
    const email = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value;

    signup(username, email, password)
      .then((response) => {
        if (response.success) {
          setPreventHook(true);
          // BUG: Instead of unknown, there would be a type for the response
          setUser((response as unknown as LoginResponseSuccess).data);
          setToken((response as unknown as LoginResponseSuccess).token);
          navigate('/welcome');
          toast.success('Signed up successfully');
        } else {
          toast.error(response.message);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5 p-5">
      <Title>Sign up</Title>

      <form
        className="flex flex-col gap-5 w-full max-w-md justify-center items-center"
        onSubmit={formSubmitHandler}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg font-semibold">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            disabled={loading}
            className="rounded-full p-2 bg-orange-100 text-gray-900 font-semibold w-xs focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            disabled={loading}
            className="rounded-full p-2 bg-orange-100 text-gray-900 font-semibold w-xs focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            disabled={loading}
            className="rounded-full p-2 bg-orange-100 text-gray-900 font-semibold w-xs focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50"
          />
        </div>
        <Link
          to="/login"
          className="text-orange-500 hover:text-orange-700 transition-colors duration-300"
        >
          Already have an account? Login
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        >
          Sign up
        </button>
      </form>
    </section>
  );
}
