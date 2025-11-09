// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense, type JSX } from "react";
import { Suspense, type JSX } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Studio from "../pages/Studio";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import ProjectDetailsPage from "../pages/ProjectDetails";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";

// Lazy load Home (good habit for future when more pages come in)
// const Home = lazy(() => import("../pages/Home"));

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<Home />),
  },
  {
    path: "/about",
    element: withSuspense(<About />),
  },
  {
    path: "/services",
    element: withSuspense(<Services />),
  },
  {
    path: "/studio",
    element: withSuspense(<Studio />),
  },
  {
    path: "/contact",
    element: withSuspense(<Contact />),
  },
  {
    path: "/projects",
    element: withSuspense(<Projects />),
  },
  {
    path: "/projects/:id",
    element: withSuspense(<ProjectDetailsPage />),
  },
  {
    path: "/blogs",
    element: withSuspense(<Blogs />),
  },
  {
    path: "/blogs/:id",
    element: withSuspense(<BlogDetails />),
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>, 
  },
]);
