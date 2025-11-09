
export interface StudioImage {
    imgUrl:string;
    imgFileId:string;
}

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
