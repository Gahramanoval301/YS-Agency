import type { ServicesProps } from "../../data/servicesFormData";

export interface ServiceBackResProps {
  id: string;
  title: string;
  includes: string[];
  updatedAt: string;
  createdAt: string;
}
export async function getAllServices() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/service`
  );

  const data = await response.json();
  return data;
}

export async function createServiceData(payload: ServicesProps) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/service`,
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

export async function updateServiceData(
  serviceId: string,
  payload: ServicesProps
) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/service/${serviceId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteService(serviceId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/service/${serviceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
}
