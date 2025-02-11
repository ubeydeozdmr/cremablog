import { type FormEvent, type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { getUserFromToken, updateUser } from '../services/api';

export default function Profile(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const [token] = useLocalStorage('token', '');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user && !loading) || !token) {
      navigate('/login');
    }
  }, [user, navigate, loading]);

  useEffect(() => {
    setLoading(true);
    getUserFromToken(token).then((response) => {
      if (response.success) {
        setUser(response.data);
        if (response.data.avatar) {
          setAvatar(response.data.avatar);
          setAvatarInput(response.data.avatar);
        }
        if (response.data.fullName) {
          setName(response.data.fullName);
          setNameInput(response.data.fullName);
        }
        if (response.data.bio) {
          setDescription(response.data.bio);
          setDescriptionInput(response.data.bio);
        }
      } else {
        console.error(response.message);
        toast.error('An error occurred while fetching user data');
      }
      setLoading(false);
    });
  }, [token]);

  useDocumentTitle('Your Profile');

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setAvatar(avatarInput);
    setName(nameInput);
    setDescription(descriptionInput);
    setIsEditing(false);
  };

  const handleDiscardChanges = () => {
    setAvatarInput(avatar);
    setNameInput(name);
    setDescriptionInput(description);
    setIsEditing(false);
  };

  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get('name') as string;
    const bio = formData.get('description') as string;
    const avatar = formData.get('avatar') as string;

    if (!user) {
      return;
    }

    updateUser(token, user._id, {
      avatar,
      bio,
      fullName,
    })
      .then((response) => {
        if (response.success) {
          handleSaveChanges();
          toast.success('Profile updated successfully');
        } else {
          console.error(response.message);
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error('An error occurred while updating the user: ', error);
        toast.error('An error occurred while updating the user');
      });
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!user) {
    return (
      <section className="flex flex-col items-center justify-center gap-5 h-screen p-5">
        <h1 className="text-4xl font-bold">403</h1>
        <p className="text-lg">Forbidden - Access Denied</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5 p-5">
      <div className="rounded-full bg-orange-500 text-orange-50 aspect-square w-40 h-40 flex items-center justify-center dark:bg-gray-800 dark:text-gray-50">
        {avatar ? (
          <img
            id="avatar"
            src={avatar}
            alt="Avatar"
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <p id="avatar-initial" className="text-6xl select-none font-bold">
            {name.charAt(0).toUpperCase()}
          </p>
        )}
      </div>
      {isEditing ? (
        <form
          className="flex flex-col gap-5 w-full items-center"
          onSubmit={formSubmitHandler}
        >
          <input
            id="name-input"
            name="name"
            className="text-4xl font-bold text-center w-full"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name here..."
            autoComplete="on"
          />
          <input
            id="description-input"
            name="description"
            className="text-lg text-center w-full"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="Describe yourself here..."
          />
          <input
            id="avatar-input"
            name="avatar"
            className="text-center w-full"
            value={avatarInput}
            onChange={(e) => setAvatarInput(e.target.value)}
            placeholder="Avatar image URL..."
          />
          <div className="flex flex-col gap-3 min-w-80">
            <button
              type="submit"
              id="save-changes"
              className="mt-5 mx-3 bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              id="discard-changes"
              className="mx-3 bg-gray-300 hover:bg-gray-400 text-gray-900 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-transparent dark:text-gray-50 dark:border-1 dark:border-gray-700 dark:hover:bg-gray-700"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 id="name" className="text-4xl font-bold text-center">
            {name}
          </h2>
          <p id="username" className="text-4xl font-bold text-center hidden">
            @{user.username}
          </p>
          <p id="description" className="text-lg text-center">
            {description}
          </p>
          <a
            id="edit-profile"
            className="mt-5 mx-3 bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            onClick={handleEditProfile}
          >
            Edit Profile
          </a>
        </>
      )}
    </section>
  );
}
