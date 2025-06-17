import { Children } from "react";
import DefaultLayout from "./components/DefaultLayout";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/LoginPage";
import Signup from "./views/RegistrationPage";
import NotFound from "./views/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }

    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
      , {
        path: '/signup',
        element: <Signup />
      }
    ]
  }, {
    path: '*',
    element: <NotFound />
  }


]);

export default router;