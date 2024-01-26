import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { Direction } from "@/types";
import styles from "./rich-text-editor.module.css";
import { useState } from "react";

type EditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  direction?: Direction;
  error?: string;
};

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

const CustomEditor = ({
  value,
  onChange,
  label,
  direction,
  error,
}: EditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={styles.wrapper} data-direction={direction}>
      {label && <span className={styles.label}>{label}</span>}
      <div>
        <div
          className={styles.ckEditorWrapper}
          data-focused={isFocused}
          data-error={!!error}>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default CustomEditor;
