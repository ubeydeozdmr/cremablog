import { type FormEvent, type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from '../components/Input';
import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { deletePost, readPost } from '../services/api';
import { PostProps } from '../types/post';

import NotFound from './NotFound';

export default function DeletePost(): ReactElement {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token] = useLocalStorage('token', '');
  const { slug } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  useDocumentTitle(post ? `Delete: ${post.title}` : 'Delete Post');

  useEffect(() => {
    setLoading(true);
    readPost(slug!)
      .then((response) => {
        if (response.success) {
          setPost(response.data);
        } else {
          console.error(response.message);
          toast.error(response.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error occurred while fetching the post');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!post) {
    return <NotFound />;
  }

  if (!user || (post.user._id !== user._id && user.role !== 'admin')) {
    return <NotFound />;
  }

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const slug = formData.get('slug') as string;

    if (slug === post.slug) {
      deletePost(token, post.slug).then((response) => {
        if (response.success) {
          navigate('/posts');
          toast.success('Post deleted successfully');
        } else {
          console.error(response.message);
          toast.error(response.message);
        }
      });
    } else {
      console.error('The slug does not match.');
      toast.error('The slug does not match.');
    }
  };

  return (
    <>
      <Title>Delete Post</Title>

      <p className="text-lg text-gray-900 dark:text-gray-50 mb-3">
        Are you sure you want to delete this post? This action cannot be undone.
      </p>

      <p className="text-lg text-gray-900 dark:text-gray-50 mb-3">
        To confirm, please type the slug of the post:{' '}
        <span className="font-semibold select-none">{post.slug}</span>
      </p>

      <form className="flex flex-col gap-5" onSubmit={formSubmitHandler}>
        <FormInput
          name="slug"
          placeholder="Type the slug of the post"
          className="w-full sm:w-80"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-red-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-red-500 dark:hover:bg-gray-700"
        >
          Delete Post
        </button>
      </form>
    </>
  );
}
