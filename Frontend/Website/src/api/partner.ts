export interface PartnerProps {
  id: string;
  imgUrl: string;
  imgUrlFileId: string;
  createdAt: string;
  updatedAt: string;
}
export async function getPartners() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/partner`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    throw error;
  }
}
