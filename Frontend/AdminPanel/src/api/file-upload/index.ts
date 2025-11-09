const API_URL = import.meta.env.VITE_BACKEND_URL;


export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/file-upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return res.json(); 
}

export async function deleteFile(fileId: string) {
  const res = await fetch(`${API_URL}/api/file-upload/${fileId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`);
  return res.json();
}

export async function updateFile(fileId: string, newFile: File) {
  const formData = new FormData();
  formData.append("file", newFile);

  const res = await fetch(`${API_URL}/api/file-upload/${fileId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error(`Update failed: ${res.statusText}`);
  return res.json(); // { message: "File updated successfully", newFile: { url, fileId } }
}


export async function getFile(fileId: string) {
  const res = await fetch(`${API_URL}/api/file-upload/${fileId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Get file failed: ${res.statusText}`);
  return res.json(); // { fileId, message }
}
