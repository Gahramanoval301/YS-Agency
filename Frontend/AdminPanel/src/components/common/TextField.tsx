import React from "react";
import { getIn } from "formik";

interface TextFieldProps {
    formik: any;
    name: string;
    placeholder?: string;
    type?: string;
    className: string;
    multiline?: boolean;
    rows?: number;
    isEdit?: boolean;
    errorAbsoluteStyle?: boolean;
    icon?: React.ReactNode; // 👈 new prop
}

const TextField: React.FC<TextFieldProps> = ({
    formik,
    name,
    placeholder,
    isEdit,
    type = "text",
    className,
    multiline,
    rows,
    errorAbsoluteStyle = false,
    icon, // 👈 new prop
}) => {
    const value = getIn(formik.values, name);
    // const error = getIn(formik.errors, name);
    // const touched = getIn(formik.touched, name);

    return (
        <div style={{ marginBottom: "1rem", position: "relative" }}>
            {multiline ? (
                <textarea
                    className={`${className} pr-10`} // add padding-right to make space for icon
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={rows}
                    readOnly={!isEdit}
                />
            ) : (
                <input
                    readOnly={!isEdit}
                    className={`${className} pr-10`} // 👈 padding-right so text doesn't overlap icon
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            )}

            {/* 👇 Icon container */}
            {icon && (
                <span
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: isEdit ? "pointer" : "default",
                        opacity: isEdit ? 1 : 0.6,
                    }}
                >
                    {icon}
                </span>
            )}

            {formik.errors[name] && <div className={`common-error-style ${errorAbsoluteStyle ? "absolute-error-style" : ""}`}  >{formik.errors[name]}</div>}

        </div>
    );
};

export default TextField;
