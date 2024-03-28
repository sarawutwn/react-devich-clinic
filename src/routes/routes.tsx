import { lazy } from "react";
import Loadable from "../utils/loadable";
// import { Layouts } from "../layouts";

// owner page
// const Home = Loadable(lazy(() => import("../pages/home")));
const Customer = Loadable(lazy(() => import("../pages/customers")));
const Notfound = Loadable(lazy(() => import("../pages/not-found")));

const Routes = () => {
  return [
    {
      path: "/",
      element: <Customer />,
      // children: [
      //   {
      //     path: "/",
      //     element: ,
      //   },
      // ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ];
};

export default Routes;
