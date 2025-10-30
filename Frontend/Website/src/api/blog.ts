export interface CategoryProps {
  id: string;
  title: string;
}

export interface BlogProps {
  id: string;
  blogTitle: string;
  slug: string;
  blogContent: string;
  blogImgUrl: string;
  blogImgUrlFileId: string;
  createdAt: string;
  updatedAt: string;
  Categories: CategoryProps[];
  Tags: CategoryProps[];
}
//  blogs
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
