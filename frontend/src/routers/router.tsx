import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "@/pages/Auth";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import RouterProtector from "./RouterProtector";

import Generate from "@/pages/user pages/Generate";
import Home from "@/pages/user pages/Home";
import LandingPage from '../pages/landingPage'
import Setting from "@/pages/user pages/Setting";
import Analytics from "@/pages/user pages/Analytics";
export const router = createBrowserRouter([
  {
    path: "/user",
    element: (
      <RouterProtector>
        <App />
      </RouterProtector>
    ),
    children: [
      {
        path: "/user/",
        element: <Home />,
      },
      {
        path: "/user/tests",
        element: <Home />,
      },
      {
        path: "/user/setting",
        element: <Setting />,
      },
      {
        path: "/user/generate Qcm",
        element: <Generate />,
      },
      {
        path: "/user/anatytics",
        element: <Analytics />,
      },
    ],
  },
  {
    path: "/session",
    element: (
      <RouterProtector>
        <Auth />
      </RouterProtector>
    ),
    children: [
      {
        path: "/session/",
        element: <SignUp />,
      },
      {
        path: "/session/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path : '/',
    element : <LandingPage />
  }
]);
