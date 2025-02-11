import DOMPurify from 'dompurify';
import { type ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useUser } from '../contexts/UserContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ArrowUTurnLeft from '../icons/ArrowUTurnLeft';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import { readPost } from '../services/api';
import { PostProps } from '../types/post';

import NotFound from './NotFound';

import '../markdown.css';

type ArticleProps = {
  post: PostProps;
};

function Article({ post }: ArticleProps): ReactElement {
  const { user, title, thumbnail, html, createdAt, updatedAt } = post;
  const __html = DOMPurify.sanitize(html); // It is already sanitized on the backend side, but it was added here for extra security purposes.

  const _createdAt = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const _updatedAt = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="prose dark:prose-dark">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold py-5 md:py-10 tracking-tight text-gray-900 dark:text-gray-50">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <div className="flex items-center gap-5">
          <img
            src={user.avatar}
            alt="Author"
            className="rounded-full w-10 h-10 object-cover"
          />
          <div>
            <p className="text-gray-500 dark:text-gray-300">By</p>
            <p className="text-lg font-semibold">
              {user.fullName || user.username}
            </p>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-300">
          <time dateTime={createdAt}>{_createdAt}</time>
          {_createdAt !== _updatedAt && (
            <>
              {' '}
              &#xB7; Updated on <time dateTime={updatedAt}>{_updatedAt}</time>
            </>
          )}
        </p>
      </div>
      <div className="flex-6 overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg hover:opacity-75 transition-opacity duration-300 aspect-square md:aspect-3/2 w-full h-full object-cover dark:opacity-75 dark:hover:opacity-100"
        />
      </div>
      <div id="content" className="py-5" dangerouslySetInnerHTML={{ __html }} />
    </article>
  );
}

export default function Post(): ReactElement {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useDocumentTitle(post ? post.title : 'Post');

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
        toast.error('An error occurred while fetching the post.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!post) {
    return <NotFound />;
  }

  const isOwner = user && post.user._id === user._id;
  const isOwnerOrAdmin = user && (isOwner || user.role === 'admin');

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
        {isOwner && (
          <Link
            to="edit"
            className="text-orange-500 hover:text-orange-900 cursor-pointer flex items-center gap-2 translate-y-0 md:translate-y-5 transition-colors duration-300"
          >
            <PencilIcon />
            Edit Post
          </Link>
        )}
        {isOwnerOrAdmin && (
          <Link
            to="delete"
            className="text-red-500 hover:text-red-900 cursor-pointer flex items-center gap-2 translate-y-0 md:translate-y-5 transition-colors duration-300"
          >
            <TrashIcon />
            Delete Post
          </Link>
        )}
      </div>

      <Article post={post} />
    </>
  );
}
