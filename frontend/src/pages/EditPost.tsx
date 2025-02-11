import { type FormEvent, type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from '../components/Input';
import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useStorage';
import { readPost, updatePost } from '../services/api';
import { PostProps } from '../types/post';

import NotFound from './NotFound';

export default function EditPost(): ReactElement {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token] = useLocalStorage('token', '');
  const { slug } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  useDocumentTitle(post ? `Edit: ${post.title}` : 'Edit Post');

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

  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('image') as string;
    const markdown = formData.get('content') as string;
    setLoading(true);

    updatePost(token, slug!, title, description, thumbnail, markdown)
      .then((response) => {
        if (response.success) {
          form.reset();
          navigate(`/posts/${slug}`);
          toast.success('Post updated successfully');
        } else {
          console.error(response.message);
          toast.error(response.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error occurred while updating the post');
        setLoading(false);
      });
  }

  if (!(user && post.user._id === user._id)) {
    return <NotFound />;
  }

  return (
    <>
      <Title>Edit Post</Title>

      <form className="flex flex-col gap-5" onSubmit={formSubmitHandler}>
        <FormInput name="title" defaultValue={post.title} />
        <FormInput
          name="description"
          placeholder="Description (optional)"
          defaultValue={post.description}
        />
        <FormInput
          name="image"
          placeholder="Image URL (optional)"
          defaultValue={post.thumbnail}
        />
        <FormInput
          name="content"
          className="min-h-60"
          defaultValue={post.markdown}
          extended
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        >
          Update Post
        </button>
      </form>
    </>
  );
}
