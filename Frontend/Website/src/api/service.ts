
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
