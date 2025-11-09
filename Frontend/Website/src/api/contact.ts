export interface ContactInfo {
  headline: string;
  subHeadline: string;
  cardsData: ContactCard[];
  socialMedias: SocialMedia[];
}

export interface ContactCard {
  type: "address" | "email" | "tel" | "map";
  value: string;
}

export interface SocialMedia {
  type: "Ins" | "Ln" | "Tk" | "Yt";
  value: string;
}

export interface ClientMessage {
  id?: string; 
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; 
  comment: string;
  createdAt?: string; 
  updatedAt?: string;
}


export async function getAllContactDetails() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/contact`
  );

  const data = await response.json();
  return data;
}


export async function sendClientMessage(payload: ClientMessage) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/message`,
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
