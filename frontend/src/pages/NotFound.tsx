import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen p-5">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Not Found - Page Not Available</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
      >
        Go Back
      </button>
      <a
        href="/"
        className="text-orange-500 hover:text-orange-700 transition-colors duration-300"
      >
        Go to Home
      </a>
    </div>
  );
}
