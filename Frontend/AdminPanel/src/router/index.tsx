// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense, type JSX } from "react";
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


// Lazy load Home (good habit for future when more pages come in)
// const Home = lazy(() => import("../pages/Home"));

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<Dashboard/>),
  },
  {
    path: "/home",
    element: withSuspense(<Home />),
  },
  {
    path: "/studio",
    element: withSuspense(<Studio />),
  },
  {
    path: "/projects",
    element: withSuspense(<Projects />),
  },
  {
    path: "/blogs",
    element: withSuspense(<Blogs />),
  },
  {
    path: "/contact",
    element: withSuspense(<Contact />),
  },
  {
    path: "/services",
    element: withSuspense(<Services />),
  },
  {
    path: "/partners",
    element: withSuspense(<Partners />),
  },
  {
    path: "/about",
    element: withSuspense(<About />),
  },

  {
    path: "*",
    element: <div>404 - Page Not Found</div>, // basic fallback
  },
]);
