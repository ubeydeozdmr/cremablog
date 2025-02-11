import { Endpoint } from '../enums/endpoint';
import { Method } from '../enums/method';
import { PostProps } from '../types/post';
import { LoginResponseSuccess, ResponseProps } from '../types/response';
import { UserInfoProps, UserProps } from '../types/user';
import { apiUrl } from '../utils/env';

export async function fetchData<T>(
  endpoint: Endpoint,
  method: Method,
  auth?: string | null,
  body?: Record<string, unknown> | null,
  pathVariable?: string | number | null,
  query?: Record<string, unknown>,
): Promise<ResponseProps<T>> {
  let url = `${apiUrl}/${endpoint}`;

  if (pathVariable) {
    url = url.replace(':path', pathVariable.toString());
  }

  if (query) {
    const queryString = new URLSearchParams(query as any).toString();
    url += `?${queryString}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (auth) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${auth}`,
    };
  }

  if (
    body &&
    (method === Method.POST || method === Method.PUT || method === Method.PATCH)
  ) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (response.status === 204) {
    return { success: true } as ResponseProps<T>;
  }

  const data: ResponseProps<T> = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}

export async function readPosts(
  title?: string | null,
): Promise<ResponseProps<PostProps[]>> {
  if (title) {
    return fetchData<PostProps[]>(
      Endpoint.Posts,
      Method.GET,
      null,
      null,
      null,
      {
        title,
      },
    );
  }
  return fetchData<PostProps[]>(Endpoint.Posts, Method.GET);
}

export async function addPost(
  token: string,
  title: string,
  description: string,
  thumbnail: string,
  markdown: string,
): Promise<ResponseProps<PostProps>> {
  return fetchData<PostProps>(Endpoint.Posts, Method.POST, token, {
    title,
    description,
    thumbnail,
    markdown,
  });
}

export async function readPost(
  slug: string,
): Promise<ResponseProps<PostProps>> {
  return fetchData<PostProps>(Endpoint.Post, Method.GET, null, null, slug);
}

export async function updatePost(
  token: string,
  slug: string,
  title: string,
  description: string,
  thumbnail: string,
  markdown: string,
): Promise<ResponseProps<PostProps>> {
  if (!slug) {
    throw new Error('Slug is required');
  }

  return fetchData<PostProps>(
    Endpoint.Post,
    Method.PATCH,
    token,
    {
      title,
      description,
      thumbnail,
      markdown,
    },
    slug,
  );
}

export async function deletePost(
  token: string,
  slug: string,
): Promise<ResponseProps<PostProps>> {
  return fetchData<PostProps>(Endpoint.Post, Method.DELETE, token, null, slug);
}

export async function updateUser(
  token: string,
  id: string,
  user: UserInfoProps,
): Promise<ResponseProps<UserInfoProps>> {
  if (!user || !id) {
    throw new Error('User object with an _id is required');
  }

  return fetchData<UserInfoProps>(
    Endpoint.User,
    Method.PATCH,
    token,
    { ...user },
    id,
  );
}

export async function login(
  email: string,
  password: string,
): Promise<ResponseProps<LoginResponseSuccess>> {
  return fetchData<LoginResponseSuccess>(Endpoint.Login, Method.POST, null, {
    email,
    password,
  });
}

export async function signup(
  username: string,
  email: string,
  password: string,
): Promise<ResponseProps<LoginResponseSuccess>> {
  return fetchData<LoginResponseSuccess>(Endpoint.Signup, Method.POST, null, {
    username,
    email,
    password,
  });
}

export async function getUserFromToken(
  token: string,
): Promise<ResponseProps<UserProps>> {
  return fetchData<UserProps>(
    Endpoint.GetUserFromToken,
    Method.GET,
    token,
    null,
  );
}

export async function updateEmail(
  token: string,
  _id: string,
  password: string,
  email: string,
): Promise<ResponseProps<UserProps>> {
  return fetchData<UserProps>(
    Endpoint.UpdateEmail,
    Method.POST,
    token,
    {
      password,
      email,
    },
    _id,
  );
}

export async function updatePassword(
  token: string,
  _id: string,
  password: string,
  newPassword: string,
): Promise<ResponseProps<UserProps>> {
  return fetchData<UserProps>(
    Endpoint.UpdatePassword,
    Method.POST,
    token,
    {
      password,
      newPassword,
    },
    _id,
  );
}

export async function deleteSelf(
  token: string,
  _id: string,
  password: string,
): Promise<ResponseProps<UserProps>> {
  return fetchData<UserProps>(
    Endpoint.DeleteAccount,
    Method.POST,
    token,
    { password },
    _id,
  );
}

export async function deleteUser(
  token: string,
  _id: string,
): Promise<ResponseProps<UserProps>> {
  return fetchData<UserProps>(Endpoint.User, Method.DELETE, token, null, _id);
}
