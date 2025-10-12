import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.scss";

const CustomSelect = ({
  options,
  placeholder = "Select option",
  onChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Set default value on mount
  useEffect(() => {
    if (defaultValue) {
      const foundOption = options.find((opt) => opt.value === defaultValue);
      if (foundOption) {
        setSelected(foundOption);
      }
    }
  }, [defaultValue, options]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div
        className={`select-box ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
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
    </div>
  );
};

export default CustomSelect;
