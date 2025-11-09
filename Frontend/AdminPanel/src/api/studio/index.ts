import type { StudioFormValues, StudioImage } from "../../data/studioFormData";

export interface StudioBackResProps {
  id: string;
  headline: string;
  content: string;
  images: StudioImage[];
  createdAt: string;
  updatedAt: string;
}

export async function getStudioData() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/studio`
  );

  const data = await response.json();
  return data;
}

export async function createOrUpdateStudioData(payload: StudioFormValues) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/studio`,
    {
      method: "POST",
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
