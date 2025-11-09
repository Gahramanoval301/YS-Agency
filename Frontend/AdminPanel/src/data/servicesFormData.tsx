import * as Yup from "yup";

export interface ServicesProps {
    title: string
    includes: string[]
}

export const serviceInitialValues: ServicesProps = {
    title: "",
    includes: [],
};

export const useServiceSchemaValidation = () => {
    return Yup.object().shape({
        title: Yup.string()
            .trim()
            .required("Title is required")
            .min(3, "Title must be at least 3 characters long"),
        includes: Yup.array()
            .of(
                Yup.string()
                    .trim()
                    .required("Each included item must not be empty")
            )
            .min(1, "At least one included item is required"),
    });
}


