import React, { useState } from "react";
import { getIn } from "formik";

interface ServiceListFieldProps {
    formik: any;
    name: string; // e.g. "includes"
    placeholder?: string;
    isEdit?: boolean;
}

const ServiceListField: React.FC<ServiceListFieldProps> = ({
    formik,
    name,
    placeholder = "Type a service and press Enter",
    isEdit = true,
}) => {
    const value: string[] = getIn(formik.values, name) || [];
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            const updatedList = [...value, inputValue.trim()];
            formik.setFieldValue(name, updatedList);
            setInputValue("");
        }
    };

    const handleRemove = (index: number) => {
        const updatedList = value.filter((_, i) => i !== index);
        formik.setFieldValue(name, updatedList);
    };

    return (
        <div className="flex flex-col gap-2">
            {/* List of added services */}
            <ul className="flex flex-col gap-1">
                {value.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 common-text-field text-white rounded-lg"
                        style={{ paddingInline: "1rem", paddingBlock: "4px" }}
                    >
                        <span className="text-xl text-white">•</span>
                        <span className="flex-1 ">{item}</span>
                        {isEdit && (
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                ✕
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {isEdit && (
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="common-text-field "
                />
            )}

            {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 text-sm">{formik.errors[name] as string}</div>
            )}
        </div>
    );
};

export default ServiceListField;
