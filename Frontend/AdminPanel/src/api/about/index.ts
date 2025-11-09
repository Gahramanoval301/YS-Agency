
export async function getAboutData() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/about/get`);

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}

export async function updateAboutData(formData:FormData) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/about/update-data`, {
    method: "PATCH",
    body: formData, // no stringify
  });

  if (!response.ok) {
    throw new Error(`Failed to update: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
