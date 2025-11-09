import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useEffect } from "react";
import { refreshToken } from "./api/auth";
import { Toaster } from 'react-hot-toast';

function App() {

  async function refreshUserToken() {
    await refreshToken();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshUserToken();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />

      <RouterProvider router={router} />
    </>
  )
}

export default App
