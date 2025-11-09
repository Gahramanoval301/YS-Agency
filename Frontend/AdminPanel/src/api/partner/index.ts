export interface PartnerBackProps {
  id: string;
  imgUrl: string;
  imgUrlFileId: string;
  note: null;
  createdAt: string;
  updatedAt: string;
}

export async function getLastPartners() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/partner`
  );

  const data = await response.json();
  return data;
}

export async function createPartnerData(payload: FormData) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/partner`,
    {
      method: "POST",
      credentials: "include",
      body: payload, // ✅ FormData directly
    }
  );

  const data = await response.json();
  return data;
}

export async function updatePartnerData(partnerId: string, payload: FormData) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/partner/${partnerId}`,
    {
      method: "PATCH",
      credentials: "include",
      body: payload, // ✅ send FormData directly
    }
  );

  const data = await response.json();
  return data;
}

export async function deletePartner(blogId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/partner/${blogId}`,
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
