import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Layouts } from "../layouts";

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
