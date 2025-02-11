import { FormEvent, type ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import FormInput from '../components/Input';
import RadioField from '../components/RadioField';
import Subheading from '../components/Subheading';
import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { getUserFromToken, updateEmail, updatePassword } from '../services/api';
import { UserProps } from '../types/user';

function ThemeSettings() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(() => {
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

  const handleThemeChange = (value: string) => {
    if (value === 'system') {
      setIsDarkMode(null);
      localStorage.removeItem('currentTheme');
      return;
    }
    setIsDarkMode(value === 'dark');
    localStorage.setItem('currentTheme', value);
  };

  useEffect(() => {
    if (isDarkMode === null) {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-row gap-5 mt-5">
      <RadioField
        name="theme"
        id="light"
        value="light"
        checked={isDarkMode === false}
        onChange={() => handleThemeChange('light')}
      />
      <RadioField
        name="theme"
        id="dark"
        value="dark"
        checked={isDarkMode === true}
        onChange={() => handleThemeChange('dark')}
      />
      <RadioField
        id="system"
        name="theme"
        value="system"
        checked={isDarkMode === null}
        onChange={() => handleThemeChange('system')}
      />
    </div>
  );
}

type TextFieldProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  disabled?: boolean;
};

function TextField({
  label,
  type,
  id,
  name,
  disabled,
}: TextFieldProps): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <FormInput
        type={type}
        id={id}
        name={name}
        autoComplete={name}
        disabled={disabled}
        placeholder=""
      />
    </div>
  );
}

type AuthSettingsProps = {
  userId: string;
};

function EmailSettings({ userId }: AuthSettingsProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [token] = useLocalStorage('token', '');

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const confirmEmail = formData.get('confirm-email') as string;

    if (email !== confirmEmail) {
      toast.error('Email and confirmation do not match.');
      return;
    }

    setLoading(true);
    updateEmail(token, userId, password, email)
      .then(() => {
        toast.success('Email updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating email:', error);
        toast.error('Failed to update email.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={formSubmitHandler}>
      <TextField
        label="Password"
        type="password"
        id="password"
        name="password"
        disabled={loading}
      />
      <TextField
        label="New Email"
        type="email"
        id="email"
        name="email"
        disabled={loading}
      />
      <TextField
        label="Confirm New Email"
        type="email"
        id="confirm-email"
        name="confirm-email"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
      >
        Save
      </button>
    </form>
  );
}

function PasswordSettings({ userId }: AuthSettingsProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [token] = useLocalStorage('token', '');

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    updatePassword(token, userId, password, newPassword)
      .then(() => {
        toast.success('Password updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating password:', error);
        toast.error('Failed to update password.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={formSubmitHandler}>
      <TextField
        label="Current Password"
        type="password"
        id="current-password"
        name="current-password"
        disabled={loading}
      />
      <TextField
        label="New Password"
        type="password"
        id="new-password"
        name="new-password"
        disabled={loading}
      />
      <TextField
        label="Confirm New Password"
        type="password"
        id="confirm-password"
        name="confirm-password"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
      >
        Save
      </button>
    </form>
  );
}

export default function Settings(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, setUser } = useUser();
  const [token] = useLocalStorage('token', '');

  useDocumentTitle('Settings');

  useEffect(() => {
    if (token && !user) {
      setLoading(true);
      getUserFromToken(token)
        .then((response) => {
          if (response.success) {
            setUser(response.data as UserProps);
          } else {
            console.error(response.message);
            toast.error('Failed to fetch user data.');
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, user, setUser]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <>
      <Title>Settings</Title>

      <Subheading>Theme</Subheading>
      <ThemeSettings />

      {user && user.email && (
        <>
          <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
            <div className="flex-1">
              <Subheading>Change Email</Subheading>
              <EmailSettings userId={user._id} />
            </div>
            <div className="flex-1">
              <Subheading>Change Password</Subheading>
              <PasswordSettings userId={user._id} />
            </div>
          </div>

          <Subheading className="mt-10">Delete Account</Subheading>
          <Link
            to="/delete-account"
            className="bg-red-500 hover:bg-red-600 text-red-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-red-500 dark:hover:bg-gray-700 block mt-5"
          >
            Delete Account
          </Link>
        </>
      )}
      {(!user || !user.email) && (
        <div className="flex flex-col gap-5 mt-5 justify-center items-center">
          <p className="text-center mt-5 text-lg text-gray-900 dark:text-gray-50">
            You need to be logged in to full-access this page.
          </p>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}
