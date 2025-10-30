import React, { useState, useRef, useEffect } from "react";
import { getIn } from "formik";

interface HashtagFieldProps {
  formik: any;
  name: string;
  placeholder?: string;
}

const HashtagField: React.FC<HashtagFieldProps> = ({
  formik,
  name,
  placeholder = "Add tags...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tags: string[] = getIn(formik.values, name) || [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", " ", ","].includes(e.key)) {
      e.preventDefault();

      const trimmed = inputValue.trim().replace(/^#/, ""); // remove existing #
      if (trimmed && !tags.includes(trimmed)) {
        const newTags = [...tags, trimmed];
        formik.setFieldValue(name, newTags);
        setInputValue("");
      }
    }

    // Handle backspace: remove last tag if input is empty
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      formik.setFieldValue(name, newTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    formik.setFieldValue(name, newTags);
  };

  // auto-focus input when clicking the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="hashtag-field flex flex-wrap items-center gap-2 p-2  rounded cursor-text"
      onClick={handleContainerClick}
    >
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="tag-item flex items-center gap-1 bg-blue-100 text-[#ff5cfc] px-2 py-1 rounded-full text-sm"
        >
          #{tag}
          <button
            type="button"
            className="text-[#ff5cfc] hover:text-red-500"
            onClick={() => handleRemoveTag(tag)}
          >
            ×
          </button>
        </div>
      ))}

      <input
        ref={inputRef}
        type="text"
        className="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
};

export default HashtagField;
