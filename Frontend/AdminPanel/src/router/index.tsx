// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, type JSX } from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Studio from "../pages/Studio";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Partners from "../pages/Partners";
import About from "../pages/About";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ProjectDetails from "../pages/ProjectDetails";

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/auth",
    element: <ProtectedRoute element={withSuspense(<Auth />)} />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={withSuspense(<Dashboard />)} />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={withSuspense(<Home />)} />,
  },
  {
    path: "/studio",
    element: <ProtectedRoute element={withSuspense(<Studio />)} />,
  },
  {
    path: "/projects",
    element: <ProtectedRoute element={withSuspense(<Projects />)} />,
  },
  {
    path: "/projects/:slug",
    element: <ProtectedRoute element={withSuspense(<ProjectDetails />)} />,
  },
  // {
  //   path: "/projects/create-new-project",
  //   element: <ProtectedRoute element={withSuspense(<ProjectDetails />)} />,
  // },
  {
    path: "/blogs",
    element: <ProtectedRoute element={withSuspense(<Blogs />)} />,
  },
  {
    path: "/contact",
    element: <ProtectedRoute element={withSuspense(<Contact />)} />,
  },
  {
    path: "/services",
    element: <ProtectedRoute element={withSuspense(<Services />)} />,
  },
  {
    path: "/partners",
    element: <ProtectedRoute element={withSuspense(<Partners />)} />,
  },
  {
    path: "/about",
    element: <ProtectedRoute element={withSuspense(<About />)} />,
  },

  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);
