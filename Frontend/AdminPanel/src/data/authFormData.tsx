import * as Yup from "yup";

export interface LoginFormValues {
    userEmail: string;
    password: string;
}

export const loginInitialValues = {
    userEmail: "",
    password: ""
}
export const useLoginSchemaValidation = () => {
    return Yup.object().shape({
        userEmail: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Required"),
    });
};

// change password
export interface ChangePasswordFormValues {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const changePasswordInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}
export const useChangePasswordValidation = () => {
    return Yup.object().shape({
    
        oldPassword: Yup.string()
            .required("Old password is required"),

        newPassword: Yup.string()
            .required("New password is required")
            .min(8, "New password must be at least 8 characters long")
            .notOneOf(
                [Yup.ref("oldPassword")],
                "New password cannot be the same as old password"
            ),

        confirmNewPassword: Yup.string()
            .required("Please confirm your new password")
            .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    });
};