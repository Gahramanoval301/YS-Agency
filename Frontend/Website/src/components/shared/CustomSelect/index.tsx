import { useState, useRef, useEffect } from "react";
import "./CustomSelect.scss";
import type { CategoryProps } from "../../../api/blog";

interface OptionProp {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: CategoryProps[];
  placeholder?: string;
  onChange: (option: CategoryProps) => void;
  defaultValue?: string;
  selectContainerStyles?: React.CSSProperties;
  selectBoxStyles?: React.CSSProperties;
}

const CustomSelect = ({
  options,
  placeholder = "Select option",
  onChange,
  defaultValue,
  selectContainerStyles,
  selectBoxStyles,
}: CustomSelectProps) => {
  // 🟢 Selected should store OptionProp or null
  const [selected, setSelected] = useState<CategoryProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 🟢 dropdownRef must be a ref to a div element
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Set default value on mount
  useEffect(() => {
    if (defaultValue) {
      const foundOption = options.find((opt) => opt.id === defaultValue);
      if (foundOption) {
        setSelected(foundOption);
      }
    }
  }, [defaultValue, options]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: CategoryProps) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option);
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

  return (
    <div
      className="custom-select"
      ref={dropdownRef}
      style={selectContainerStyles}
    >
      <div
        className={`select-box ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
        style={selectBoxStyles}
      >
        <span className={`selected ${!selected ? "placeholder" : ""}`}>
          {selected ? selected.title : placeholder}
        </span>
        <div className={`arrow ${isOpen ? "up" : ""}`} />
      </div>

      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.id}
              className={`option ${
                selected?.id === option.id ? "active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
