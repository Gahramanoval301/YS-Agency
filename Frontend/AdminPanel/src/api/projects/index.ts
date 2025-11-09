import type {
  ProjectBaseFormValues,
  ProjectFormValues,
} from "../../data/projectsFormData";

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

export async function createProjectData(payload: ProjectBaseFormValues | ProjectFormValues) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/project`,
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

export async function updateProjectData(
  serviceId: string,
  payload: ProjectFormValues | ProjectBaseFormValues
) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/project/${serviceId}`,
    {
      method: "PATCH",
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

export async function deleteProject(projectId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`,
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
