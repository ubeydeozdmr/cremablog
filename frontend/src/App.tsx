import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthProvider from './AuthProvider';
import { UserProvider } from './contexts/UserContext';
import { Page } from './enums/page';
import Layout from './Layout';
import AddPost from './pages/AddPost';
import DeleteAccount from './pages/DeleteAccount';
import DeletePost from './pages/DeletePost';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: Page.Home,
        element: <Home />,
      },
      {
        path: Page.Posts,
        element: <Posts />,
      },
      {
        path: Page.Post,
        element: <Post />,
      },
      {
        path: Page.AddPost,
        element: <AddPost />,
      },
      {
        path: Page.EditPost,
        element: <EditPost />,
      },
      {
        path: Page.DeletePost,
        element: <DeletePost />,
      },
      {
        path: Page.Profile,
        element: <Profile />,
      },
      {
        path: Page.Settings,
        element: <Settings />,
      },
      {
        path: Page.DeleteAccount,
        element: <DeleteAccount />,
      },
      {
        path: Page.Signup,
        element: <Signup />,
      },
      {
        path: Page.Login,
        element: <Login />,
      },
      {
        path: Page.Logout,
        element: <Logout />,
      },
      {
        path: Page.Welcome,
        element: <Welcome />,
      },
      {
        path: Page.NotFound,
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
