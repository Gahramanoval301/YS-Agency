import * as Yup from "yup";

export interface StudioImage {
    imgUrl: string;
    imgFileId: string;
}

export interface StudioFormValues {
    headline: string;
    content: string;
    images: StudioImage[]; // Array of objects
}

export const studioInitialValues: StudioFormValues = {
    headline: "",
    content: "",
    images: [
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
    ],
};

export const useStudioSchemaValidation = () => {
    return Yup.object().shape({
        headline: Yup.string()
            .trim()
            .required("Headline is required."),

        content: Yup.string()
            .trim()
            .required("Content is required."),

        images: Yup.array()
            .of(
                Yup.object().shape({
                    imgUrl: Yup.string()
                        .trim()
                        .url("Invalid image URL.")
                        .required("Image URL is required."),
                    imgFileId: Yup.string()
                        .trim()
                        .required("Image File ID is required."),
                })
            )
            .required("Images are required.")
            .length(5, "Exactly 5 images are required."),
    });
};
