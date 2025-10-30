import React from "react";
import { getIn } from "formik";

interface TextFieldProps {
    formik: any; // Formik instance
    name: string; // path to value e.g. "texts[0].headline" or "statistics.projects"
    placeholder?: string;
    type?: string;
    className: string;
    multiline?: boolean;
    rows?: number;
    isEdit?: boolean;
    errorAbsoluteStyle?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ formik, name, placeholder, isEdit, type = "text", className, multiline, rows, errorAbsoluteStyle=false }) => {
    const value = getIn(formik.values, name);
    // const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);

    console.log("formik errors", formik.errors[name], name);


    return (
        <div style={{ marginBottom: "1rem" }}>
            {multiline ? (
                <textarea
                    className={className}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={rows}
                />
            ) : (
                <input
                    readOnly={!isEdit}
                    className={className}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            )}

            {formik.errors[name] && <div className={`common-error-style ${errorAbsoluteStyle ? "absolute-error-style" : ""}`}  >{formik.errors[name]}</div>}
        </div>
    );
};

export default TextField;
