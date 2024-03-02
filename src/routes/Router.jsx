import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Error from "../pages/errorPage/Error";
import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Home from "../pages/home/Home";
import Task from "../pages/task/Task";
import PrivateRoute from "./privateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      {
        path: "/task",
        element: (
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
