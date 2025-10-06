// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense, type JSX } from "react";
import { Suspense, type JSX } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";

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
    path: "*",
    element: <div>404 - Page Not Found</div>, // basic fallback
  },
]);
