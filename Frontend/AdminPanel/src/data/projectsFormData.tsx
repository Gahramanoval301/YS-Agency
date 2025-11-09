import * as Yup from "yup";

export interface ProjectBaseFormValues {
    title: string;
    headline: string;
    image: any;
    imgFileId: string;
    content: string;
    categoryIds: string[]; // Array of category IDs
}

export const projectBaseInitialValues: ProjectBaseFormValues = {
    title: "",
    headline: "",
    image: "",
    imgFileId: "89",
    content: "",
    categoryIds: [],
};

export const useProjectBaseSchemaValidation = () => {
    return Yup.object({
        title: Yup.string()
            .required("Title is required")
            .min(3, "Title must be at least 3 characters"),
        headline: Yup.string()
            .required("Headline is required")
            .min(5, "Headline must be at least 5 characters"),
        image: Yup.mixed(),
        imgFileId: Yup.string().nullable().optional(),
        content: Yup.string()
            .required("Content is required")
            .min(10, "Content must be at least 10 characters"),
        categoryIds: Yup.array()
            .of(Yup.string().uuid("Invalid category ID"))
            .min(1, "Select at least one category"),
            
    });
}


// Section interfaces
export interface PhotoDescSectionValues {
    title: string;
    description: string;
    imgUrl: string;
    imgFileId: string;
}

export interface VideoDescSectionValues {
    title: string;
    description: string;
    youtubeLink: string;
    imgUrl: string;
    imgFileId: string;
}

export interface PhotoGallerySectionValues {
    title: string;
    imgUrl: string;
    imgFileId: string;
}

export interface VideoGallerySectionValues {
    youtubeLink: string;
    imgUrl: string;
    imgFileId: string;
}

export interface SectionImage {
    imgUrl: string;
    imgFileId: string;
}

// Main project form values
export interface ProjectFormValues {
    title: string;
    headline: string;
    imgUrl: string;
    imgFileId: string;
    content: string;
    categoryIds: string[];
    sectionImages: SectionImage[];
    photoDescSections: PhotoDescSectionValues[];
    videoDescSections: VideoDescSectionValues[];
    photoGallerySections: PhotoGallerySectionValues[];
    videoGallerySections: VideoGallerySectionValues[];
}

export const useProjectSchemaValidation = () => {
    return Yup.object({
        title: Yup.string().required("Title is required").min(3),
        headline: Yup.string().required("Headline is required").min(5),
        imgUrl: Yup.mixed(),
        imgFileId: Yup.string().nullable().optional(),
        content: Yup.string().required("Content is required").min(10),
        categoryIds: Yup.array().of(Yup.string().uuid()).min(1, "Select at least one category"),
        sectionImages: Yup.array()
            .of(
                Yup.object({
                    imgUrl: Yup.string()
                        .url("Invalid image URL")
                        .required("Image URL is required"),
                    imgFileId: Yup.string().required("File ID is required"),
                })
            )
            .length(2, "Exactly 2 section images are required"),
        photoDescSections: Yup.array().of(
            Yup.object({
                title: Yup.string().required("Title is required"),
                description: Yup.string().required("Description is required"),
                imgUrl: Yup.mixed(),
                imgFileId: Yup.string().nullable().optional(),
            })
        ),

        videoDescSections: Yup.array().of(
            Yup.object({
                title: Yup.string().required("Title is required"),
                description: Yup.string().required("Description is required"),
                youtubeLink: Yup.string().url("Must be a valid URL").nullable(),
                imgUrl: Yup.mixed(),
                imgFileId: Yup.string().nullable().optional(),
            })
        ),

        photoGallerySections: Yup.array().of(
            Yup.object({
                title: Yup.string(),
                imgUrl: Yup.mixed(),
                imgFileId: Yup.string().nullable().optional(),
            })
        ),

        videoGallerySections: Yup.array().of(
            Yup.object({
                youtubeLink: Yup.string().url("Must be a valid URL").nullable(),
                image: Yup.mixed(),
                imgFileId: Yup.string().nullable().optional(),
            })
        ),
    });
};
