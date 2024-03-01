import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Error from "../pages/errorPage/Error";
import Home from "../pages/home/Home";
import { Counter } from "../pages/counter/Counter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/counter", element: <Counter /> },
    ],
  },
]);
