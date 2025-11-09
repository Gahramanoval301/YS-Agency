import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Loader />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
