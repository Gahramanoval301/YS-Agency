import { useState, useRef, useEffect } from "react";
import { getIn } from "formik";

interface OptionProp {
  label: string;
  value: string;
}

interface SingleSelectFieldProps {
  formik: any; // Formik instance
  name: string; // field name e.g. "blogCategory"
  options: OptionProp[];
  placeholder?: string;
  defaultValue?: string;
  selectContainerStyles?: React.CSSProperties;
  selectBoxStyles?: React.CSSProperties;
  isEdit?: boolean;
}

const SingleSelectField = ({
  formik,
  name,
  options,
  placeholder = "Select option",
  defaultValue,
  selectContainerStyles,
  selectBoxStyles,
  isEdit = true,
}: SingleSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sync Formik’s value
  const value = getIn(formik.values, name);
  const selected = options.find((opt) => opt.value === value) || null;

  useEffect(() => {
    if (defaultValue && !value) {
      const foundOption = options.find((opt) => opt.value === defaultValue);
      if (foundOption) {
        formik.setFieldValue(name, foundOption.value);
      }
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    if (isEdit) setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: OptionProp) => {
    formik.setFieldValue(name, option.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
      className="custom-select SingleSelectField-select"
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
        <span className={`selected ${!selected ? "placeholder" : ""}`}>
          {selected ? selected.label : placeholder}
        </span>
        <div className={`arrow ${isOpen ? "up" : ""}`} />
      </div>

      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`option ${
                selected?.value === option.value ? "active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {touched && error && (
        <div className="common-error-style absolute-error-style">{error}</div>
      )}
    </div>
  );
};

export default SingleSelectField;
