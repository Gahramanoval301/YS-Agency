import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useEffect } from "react";
import { refreshToken } from "./api/auth";

function App() {

  async function refreshUserToken() {
    const res = await refreshToken();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshUserToken();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
