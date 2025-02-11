import { useEffect, type ReactElement } from 'react';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Welcome(): ReactElement {
  useDocumentTitle('Welcome!');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    document.documentElement.style.overflowX = 'hidden';
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Confetti />
      <h1 className="text-4xl font-bold text-center">Welcome to CremaBlog</h1>
      <p className="text-lg text-center mt-5">
        A place where you can share your thoughts with the world
      </p>
      <Link
        to="/profile"
        className="mt-10 mx-3 bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
      >
        Get Started
      </Link>
    </section>
  );
}
