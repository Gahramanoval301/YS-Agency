import type { BlogFormValues } from "../../data/blogFormData";

// get blogs
export async function getAllBlogs(
  page: number,
  limit: number,
  category?: string,
  tag?: string,
  searchTitle?: string
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/blog?page=${page}&limit=${limit}&category=${category || ""}&tag=${
      tag || ""
    }&title=${searchTitle || ""}`
  );

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}
export async function getSingleBlog(blogSlugOrId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogSlugOrId}`
  );

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}
export async function getLastBlogs() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/last-blogs`
  );

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}

export async function createBlogData(payload: BlogFormValues) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog`, {
    method: "POST",
    credentials: "include",
    body: payload, // ✅ FormData directly (no JSON.stringify)
  });

  const data = await response.json();
  return data;
}

export async function updateBlogData(blogId: string, payload: BlogFormValues) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`,
    {
      method: "PUT", // ✅ use PUT or PATCH
      credentials: "include",
      body: payload, // ✅ send FormData directly
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteBlog(blogId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`,
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

// category
export async function getCategories(page: number, limit: number) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/category?page=${page}&limit=${limit}`
  );

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}

export async function getSingleCategory(categoryId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/${categoryId}`
  );

  // Make sure you parse JSON
  const data = await response.json();
  return data;
}

export async function createCategory(payload: { title: string }) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  return data;
}

export async function updateCategory(
  categoryId: string,
  payload: { title: string }
) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/${categoryId}`,
    {
      method: "PUT", // ✅ use PUT or PATCH
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Sending JSON
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCategory(categoryId: string) {
  console.log(categoryId);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/${categoryId}`,
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
