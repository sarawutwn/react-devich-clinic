import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loadable from "../utils/loadable";
import { Layouts } from "../layouts";
import store from "../redux/store";
import jwt from "jwt-decode";
import Middleware from "../middleware/middleware";
import LoginLayout from "../layouts/login-layout";
import { AdminsFunc } from "../middleware/function";

// owner page
const Notfound = Loadable(lazy(() => import("../pages/not-found")));

const Routes = () => {
  return [
    {
      path: "/",
      element: <Layouts />,
      children: [],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ];
};

export default Routes;
