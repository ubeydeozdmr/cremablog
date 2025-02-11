import { type ReactElement, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useUser } from './contexts/UserContext';
import useClickOutside from './hooks/useClickOutside';
import Bars3BottomRight from './icons/Bars3BottomRight';
import UserIcon from './icons/UserIcon';
import XMark from './icons/XMark';

function NavDesktop(): ReactElement {
  const { pathname } = useLocation();

  const regularClasses =
    'text-gray-500 hover:text-gray-900 uppercase leading-10 font-semibold transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-300 dark:border-gray-500';
  const activeClasses =
    'text-orange-500 border-b-2 dark:text-orange-500 dark:border-orange-500 text-orange-500 hover:text-orange-900 uppercase leading-10 font-semibold transition-colors duration-300 border-b-2 dark:text-orange-50 dark:hover:text-orange-300 dark:border-orange-500';

  return (
    <nav className="hidden md:flex gap-10">
      <Link
        to="/"
        className={`${pathname === '/' ? activeClasses : regularClasses}`}
      >
        Home
      </Link>
      <Link
        to="/posts"
        className={`${pathname === '/posts' ? activeClasses : regularClasses}`}
      >
        All
      </Link>
    </nav>
  );
}

function NavMobile(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="block md:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Bars3BottomRight />
      </button>

      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 z-10 w-full h-full bg-gray-900 opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <aside
        className={`absolute top-0 left-0 z-100 bg-white text-gray-900 rounded-tr-md rounded-br-md h-full min-w-60 p-3 text-md shadow-md dark:bg-gray-800 dark:text-gray-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-0 right-0 p-3 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <XMark />
        </button>
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/"
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              All Posts
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

function NavMenu(): ReactElement {
  return (
    <div className="flex-0 sm:flex-1">
      <NavDesktop />
      <NavMobile />
    </div>
  );
}

function SearchBar(): ReactElement {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/posts?title=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <div className="flex-1 flex justify-center relative w-[calc(100%-2rem)] lg:w-[min(50vw,600px)]">
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="rounded-full p-2 bg-orange-100 text-gray-900 font-semibold w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50 lg:w-[calc(100%-2rem)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      {search.trim() && (
        <button
          onClick={handleSearch}
          id="search-button"
          className="z-1000 absolute -right-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 bg-orange-100 text-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-200 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function ProfileMenu(): ReactElement {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useClickOutside(() => setIsProfileMenuOpen(false), buttonRef);
  const { user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const currentTheme = localStorage.getItem('currentTheme') as
      | 'light'
      | 'dark'
      | 'system'
      | null;
    if (currentTheme === 'system' || !currentTheme) {
      return null;
    }
    return currentTheme === 'dark';
  });

  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const switchValue = isDarkMode === null ? systemPrefersDark : isDarkMode;

  useEffect(() => {
    if (isDarkMode === null) {
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('currentTheme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, systemPrefersDark]);

  const buttonIcon = user ? (
    user.avatar ? (
      <img
        src={user.avatar}
        alt={user.username}
        className="w-full h-full object-cover"
      />
    ) : (
      user.username.charAt(0).toUpperCase()
    )
  ) : (
    <div className="w-5 h-5 ml-2 mb-1">
      <UserIcon />
    </div>
  );

  const navList = (
    <ul className="flex flex-col gap-2">
      <li className="flex flex-row items-center gap-2">
        <p className="size-max">Dark mode</p>

        <label
          htmlFor="dark-mode"
          className="flex items-center cursor-pointer select-none"
        >
          <input
            type="checkbox"
            id="dark-mode"
            className="hidden"
            onChange={() => setIsDarkMode(!isDarkMode)}
            checked={switchValue}
          />
          <span className="rounded-full w-10 h-5 bg-gray-300 flex items-center p-1">
            <span
              id="dark-mode-circle"
              className={`rounded-full w-3 h-3 bg-gray-900 ${
                switchValue ? 'transform translate-x-5' : ''
              }`}
            ></span>
          </span>
        </label>
      </li>
      <li>
        <Link
          to="/settings"
          onClick={() => setIsProfileMenuOpen(false)}
          className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
        >
          Settings
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link
              to="/profile"
              onClick={() => setIsProfileMenuOpen(false)}
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              onClick={() => setIsProfileMenuOpen(false)}
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/login"
              onClick={() => setIsProfileMenuOpen(false)}
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              onClick={() => setIsProfileMenuOpen(false)}
              className="text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500"
            >
              Signup
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="flex-1 flex justify-end gap-5 relative">
      <button
        ref={buttonRef}
        className="rounded-full overflow-hidden w-10 h-10 aspect-square bg-orange-500 text-orange-50 font-semibold hover:bg-orange-600 align-middle cursor-pointer transition-colors duration-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
      >
        {buttonIcon}
      </button>
      <div
        ref={ref}
        id="user-menu"
        className={`absolute mt-12 right-0 bg-white text-gray-900 rounded-md p-3 text-md shadow-md dark:bg-gray-800 dark:text-gray-50 z-2000 ${
          isProfileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        {navList}
      </div>
    </div>
  );
}

function Header(): ReactElement {
  return (
    <header className="flex p-5 justify-between items-center gap-5">
      <NavMenu />

      <SearchBar />

      <ProfileMenu />
    </header>
  );
}

function Footer(): ReactElement {
  return (
    <footer className="flex justify-center items-center px-5 py-10 sm:py-20">
      <p className="text-gray-500 text-center dark:text-gray-300">
        &copy; 2025 CremaBlog. All rights reserved.
      </p>
    </footer>
  );
}

export default function Layout(): ReactElement {
  return (
    <>
      <Header />

      <div className="container px-5 mx-auto max-w-7xl">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
