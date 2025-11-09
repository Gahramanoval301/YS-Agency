import type { ContactInfo } from "../api/contact";
import * as Yup from "yup";

export const contactInitialValues: ContactInfo = {
    headline: "",
    subHeadline: "",
    cardsData: [
        { type: "address", value: "" },
        { type: "email", value: "" },
        { type: "tel", value: "" },
        { type: "map", value: "" },
    ],
    socialMedias: [
        { type: "Ins", value: "" },
        { type: "Ln", value: "" },
        { type: "Tk", value: "" },
        { type: "Yt", value: "" },
    ],
};
export const useContactSchemaValidation = () => {
    return Yup.object().shape({
        headline: Yup.string()
            .trim()
            .required("Headline is required."),
        subHeadline: Yup.string()
            .trim()
            .required("Subheadline is required."),
        cardsData: Yup.array()
            .of(
                Yup.object().shape({
                    type: Yup.mixed<"address" | "email" | "tel" | "map">()
                        .oneOf(["address", "email", "tel", "map"])
                        .required(),
                    value: Yup.string()
                        .trim()
                        .when("type", {
                            is: "email",
                            then: (schema) =>
                                schema
                                    .email("Invalid email address.")
                                    .required("Email is required."),
                            otherwise: (schema) =>
                                schema.required("Value is required."),
                        }),
                })
            )
            .required()
            .min(4, "All contact card fields are required."),
        socialMedias: Yup.array()
            .of(
                Yup.object().shape({
                    type: Yup.mixed<"Ins" | "Ln" | "Tk" | "Yt">()
                        .oneOf(["Ins", "Ln", "Tk", "Yt"])
                        .required(),
                    value: Yup.string()
                        .trim()
                        .url("Invalid URL.")
                        .required("Social media URL is required."),
                })
            )
            .required()
            .min(4, "All social media links are required."),
    });
}