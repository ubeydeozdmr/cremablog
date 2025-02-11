import { useState, type FormEvent, type ReactElement } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import FormInput from '../components/Input';
import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { addPost } from '../services/api';

import NotFound from './NotFound';

export default function AddPost(): ReactElement {
  const [token] = useLocalStorage('token', '');
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useDocumentTitle('Add Post');

  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('image') as string;
    const markdown = formData.get('content') as string;

    addPost(token, title, description, thumbnail, markdown).then((response) => {
      if (response.success) {
        form.reset();
        navigate('/posts');
        toast.success('Post added successfully');
      } else {
        toast.error(response.message);
        console.error(response.message);
      }
      setLoading(false);
    });
  }

  if (!user?.role || !['editor', 'admin'].includes(user.role)) {
    return <NotFound />;
  }

  return (
    <>
      <Title>Add Post</Title>

      <form className="flex flex-col gap-5" onSubmit={formSubmitHandler}>
        <FormInput name="title" disabled={loading} />
        <FormInput
          name="description"
          placeholder="Description (optional)"
          disabled={loading}
        />
        <FormInput
          name="image"
          placeholder="Image URL (optional)"
          disabled={loading}
        />
        <FormInput
          name="content"
          className="min-h-60"
          extended
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        >
          Add Post
        </button>
      </form>
    </>
  );
}
