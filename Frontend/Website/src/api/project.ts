export interface Category {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoDescSection {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  imgFileId: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface VideoDescSection {
  id: string;
  title: string;
  youtubeLink: string;
  description: string;
  imgUrl: string;
  imgFileId: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface PhotoGallerySection {
  id: string;
  title: string;
  imgUrl: string;
  imgFileId: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface VideoGallerySection {
  id: string;
  youtubeLink: string;
  imgUrl: string;
  imgFileId: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface SectionImage {
  imgUrl: string;
  imgFileId: string;
}

export interface ProjectBackResProps {
  id: string;
  title: string;
  headline: string;
  slug: string;
  imgUrl: string;
  imgFileId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  sectionImages: SectionImage[];
  photoDescSections: PhotoDescSection[];
  videoDescSections: VideoDescSection[];
  photoGallerySections: PhotoGallerySection[];
  videoGallerySections: VideoGallerySection[];
}

export interface ProjectItem {
  id: string;
  title: string;
  headline: string;
  imgUrl: string;
  content: string; 
}


export async function getSingleProject(projectSlugOrId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/project/${projectSlugOrId}`
  );

  const data = await response.json();
  return data;
}

export async function getAllProjects(
  page: number,
  limit: number,
  categoryId?: string
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/project?page=${page}&limit=${limit}&category=${categoryId || ""}`
  );

  const data = await response.json();
  return data;
}

export async function getSmallProjects(
  page: number,
  limit: number
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/project/small-data?page=${page}&limit=${limit}`
  );

  const data = await response.json();
  return data;
}
