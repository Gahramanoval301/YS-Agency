export interface TextItem {
  headline: string;
  content: string;
}

export interface Statistics {
  projects: string;
  annualSuccessActivity: string;
  partnership: string;
  ourTeam: string;
}

export interface AboutFormValues {
  statistics: Statistics;
  texts: TextItem[];
  imageUrl: string;
}

export async function getAboutData() {
  try {
    const response = await fetch("http://localhost:4000/api/about/get", {
      method: "GET",
      // Optional: add headers if needed
      // headers: {
      //   "Accept": "application/json",
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // parse JSON response
    return data;
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    throw error;
  }
}
