import { useRef } from "react";
import JoditEditor from "jodit-react";

interface RichTextFieldProps {
  name: string;
  value: string;
  placeholder?: string;
  isEdit?: boolean;
  onChange?: (value: string) => void;
}

export default function RichTextField({
  // name,
  value,
  placeholder = "Enter text...",
  isEdit = true,
  onChange,
}: RichTextFieldProps) {
  const editor = useRef(null);
  console.log(value);


  return (
   <JoditEditor
  ref={editor}
  value={value}
  config={{
    readonly: !isEdit,
    autofocus: false,
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "undo", "redo",
      "|",
      "bold", "italic", "underline",
      "|",
      "fontsize", 
    ],
    placeholder: placeholder,
    styleValues: {
      fontSize: [
        "8px",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "24px",
        "32px",
        "48px",
      ],
    },
  }}
  onBlur={(newContent) => onChange && onChange(newContent)}
/>


  );
}
