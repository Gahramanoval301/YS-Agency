import * as Yup from "yup";

// blog
export interface BlogFormValues {
    blogTitle: string;
    blogContent: string;
    blogCategories: string[];
    blogTags: string[];
    image: File | null | string;
}

export const blogInitialValues = {
    blogTitle: "",
    blogContent: "",
    blogCategories: [],
    blogTags: [],
    image: null,
}

export const useBlogSchemaValidation = () => {
    return Yup.object().shape({
        blogTitle: Yup.string().required("Required"),
        blogContent: Yup.string().required("Required"),
        blogCategories: Yup.array().of(Yup.string()).optional(),
        blogTags: Yup.array().of(Yup.string()).optional(),
        image: Yup.mixed(),
    });
}

// category
export interface CategoryFormValues {
    blogCategory: string;
}

export const categoryInitialValues = {
    blogCategory: ""
}

export const useCategorySchemaValidation = () => {
    return Yup.object().shape({
        blogCategory: Yup.string().required("Required").trim(),
    });
}