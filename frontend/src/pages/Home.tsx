import { type ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import Title from '../components/Title';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { readPosts } from '../services/api';
import { PostProps } from '../types/post';
import { ResponseSuccessProps } from '../types/response';

function Post(post: PostProps): ReactElement {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/posts/${post.slug}`}
      className="w-full h-full flex flex-col first:sm:flex-row first:sm:col-span-2 first:lg:col-span-3 gap-8 group"
    >
      <div className="group-first:flex-6 overflow-hidden rounded-lg">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="rounded-lg hover:opacity-75 transition-opacity duration-300 aspect-square md:aspect-3/2 w-full h-full object-cover dark:opacity-75 dark:hover:opacity-100"
        />
      </div>
      <div className="flex-4 flex flex-col gap-5">
        <p className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300 dark:text-gray-300 dark:hover:text-gray-100">
          <time dateTime={post.createdAt}>{date}</time> &#xB7;{' '}
          {post.user.username}
        </p>
        <p className="text-4xl group-first:lg:text-5xl group-first:xl:text-6xl font-semibold text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500">
          {post.title}
        </p>
        <p className="text-lg text-gray-500 leading-8 hover:text-gray-900 transition-colors duration-300 dark:text-gray-300 dark:hover:text-gray-100">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

function Posts(): ReactElement {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle('Home');

  useEffect(() => {
    setLoading(true);
    readPosts()
      .then((data) => {
        setPosts((data as ResponseSuccessProps<PostProps[]>).data);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!posts.length) {
    return <p className="text-gray-500">No posts found.</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
}

export default function Home(): ReactElement {
  return (
    <>
      <Title>CremaBlog</Title>

      <Posts />

      <div className="flex justify-center items-center py-10">
        <Link
          to="/posts"
          className="mx-3 bg-orange-500 hover:bg-orange-600 text-orange-50 px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer w-full max-w-xs text-center dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        >
          Show More Posts
        </Link>
      </div>
    </>
  );
}
