export enum Endpoint {
  Posts = 'posts',
  Post = 'posts/:path',
  Users = 'users',
  User = 'users/:path',
  Login = 'auth/login',
  Signup = 'auth/register',
  GetUserFromToken = 'auth/me',
  UpdateEmail = 'auth/update-email/:path',
  UpdatePassword = 'auth/update-password/:path',
  DeleteAccount = 'auth/delete-account/:path',
}
