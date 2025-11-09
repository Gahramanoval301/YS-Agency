//login, check-auth, change-pass,

interface LoginProps {
  userEmail: string;
  password: string;
}
interface RequestEmailChangeProps {
  userEmail: string;
  newEmail: string;
}
interface ConfirmChangeEmailProps {
  userEmail: string;
  newEmail: string;
  code: string;
}
interface ChangePasswordProps {
  userEmail: string;
  oldPassword: string;
  newPassword: string;
}
export async function loginUser(payload: LoginProps) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      credentials: "include",
      body: JSON.stringify(payload), // Include your payload
    }
  );

  const data = await response.json();
  return data;
}
export async function refreshToken() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      body: null, // Include your payload
    }
  );

  const data = await response.json();
  return data;
}
export async function requestEmailChange(payload: RequestEmailChangeProps) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/request-email-change`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      body: JSON.stringify(payload), // Include your payload
    }
  );

  const data = await response.json();
  return data;
}
export async function confirmChangeEmail(payload: ConfirmChangeEmailProps) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/confirm-change-email`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      body: JSON.stringify(payload), // Include your payload
    }
  );

  const data = await response.json();
  return data;
}
export async function changePassword(payload: ChangePasswordProps) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      credentials: "include",
      body: JSON.stringify(payload), // Include your payload
    }
  );

  const data = await response.json();
  return data;
}

export async function checkAuth() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
