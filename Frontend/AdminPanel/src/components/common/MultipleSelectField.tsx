import { useState, useRef, useEffect } from "react";
import { getIn } from "formik";

interface OptionProp {
  label: string;
  value: string;
}

interface MultipleSelectFieldProps {
  formik: any; // Formik instance
  name: string; // field name e.g. "blogCategories"
  options: OptionProp[];
  placeholder?: string;
  defaultValues?: string[];
  selectContainerStyles?: React.CSSProperties;
  selectBoxStyles?: React.CSSProperties;
  isEdit?: boolean;
}

const MultipleSelectField = ({
  formik,
  name,
  options,
  placeholder = "Select options",
  defaultValues = [],
  selectContainerStyles,
  selectBoxStyles,
  isEdit = true,
}: MultipleSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sync Formik value
  const value: string[] = getIn(formik.values, name) || [];
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  useEffect(() => {
    if (defaultValues.length && (!value || value.length === 0)) {
      formik.setFieldValue(name, defaultValues);
    }
  }, [defaultValues]);

  const toggleDropdown = () => {
    if (isEdit) setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: OptionProp) => {
    if (!isEdit) return;

    let newValue;
    if (value.includes(option.value)) {
      newValue = value.filter((val) => val !== option.value);
    } else {
      newValue = [...value, option.value];
    }

    formik.setFieldValue(name, newValue);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  return (
    <div
      className="custom-select multiple MultipleSelectField-select"
      ref={dropdownRef}
      style={selectContainerStyles}
    >
      <div
        className={`select-box ${isOpen ? "open" : ""} ${
          !isEdit ? "disabled" : ""
        }`}
        onClick={toggleDropdown}
        style={selectBoxStyles}
      >
        <span className={`selected ${selectedOptions.length === 0 ? "placeholder" : ""}`}>
          {selectedOptions.length > 0
            ? selectedOptions.map((opt) => opt.label).join(", ")
            : placeholder}
        </span>
        <div className={`arrow ${isOpen ? "up" : ""}`} />
      </div>

      {isOpen && (
        <div className="options">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                className={`option ${isSelected ? "active" : ""}`}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  style={{ marginRight: "8px" }}
                />
                {option.label}
              </div>
            );
          })}
        </div>
      )}

      {touched && error && (
        <div className="common-error-style absolute-error-style">{error}</div>
      )}
    </div>
  );
};

export default MultipleSelectField;
