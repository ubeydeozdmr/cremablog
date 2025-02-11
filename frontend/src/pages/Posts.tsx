import { type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Title from '../components/Title';
import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useQuery from '../hooks/useQuery';
import ArrowUTurnLeft from '../icons/ArrowUTurnLeft';
import PlusIcon from '../icons/PlusIcon';
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
      className="w-full h-full flex flex-col gap-8 group"
    >
      <div className="flex-6 overflow-hidden rounded-lg">
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
        <p className="text-4xl font-semibold text-gray-900 hover:text-orange-500 transition-colors duration-300 dark:text-gray-50 dark:hover:text-orange-500">
          {post.title}
        </p>
        <p className="text-lg text-gray-500 leading-8 hover:text-gray-900 transition-colors duration-300 dark:text-gray-300 dark:hover:text-gray-100">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

export default function Posts(): ReactElement {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const query = useQuery();

  useDocumentTitle('Posts');

  useEffect(() => {
    setLoading(true);
    readPosts(query.get('title'))
      .then((data) => {
        setPosts((data as ResponseSuccessProps<PostProps[]>).data);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <div className="flex justify-start items-center gap-5">
        {history.length > 1 && (
          <button
            id="back-button"
            onClick={() => navigate(-1)}
            className="text-orange-500 hover:text-orange-900 cursor-pointer flex items-center gap-2 translate-y-0 md:translate-y-5 transition-colors duration-300"
          >
            <ArrowUTurnLeft />
            Back
          </button>
        )}
        {user && (user.role === 'editor' || user.role === 'admin') && (
          <Link
            to="add"
            id="add-post-button"
            className="text-orange-500 hover:text-orange-900 cursor-pointer flex items-center gap-2 translate-y-0 md:translate-y-5 transition-colors duration-300"
          >
            <PlusIcon />
            Add Post
          </Link>
        )}
      </div>

      <Title>{query.get('title') ? 'Some Posts' : 'All Posts'}</Title>
      {query.get('title') && (
        <p className="text-gray-500 mb-5">
          Search results for <strong>{query.get('title')}</strong>
        </p>
      )}

      {posts.length ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </section>
      ) : (
        <p className="text-red-500">
          No posts found. Try searching for something else.
        </p>
      )}
    </>
  );
}
