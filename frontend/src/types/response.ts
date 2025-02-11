import { UserProps } from './user';

export interface LoginResponseSuccess {
  success: true;
  token: string;
  data: UserProps;
}

export interface ResponseErrorProps {
  success: false;
  message: string;
  stack?: string;
}

export interface ResponseSuccessProps<T> {
  success: true;
  data: T;
}

export type ResponseProps<T> = ResponseErrorProps | ResponseSuccessProps<T>;
