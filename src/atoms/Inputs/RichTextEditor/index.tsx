"use client";

// components/custom-editor.js

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { Direction } from "@/types";
import { Control, Controller, FieldValues } from "react-hook-form";
import styles from "./rich-text-editor.module.css";

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

function CustomEditor({
  value,
  onChange,
  label,
  direction,
  error,
}: EditorProps) {
  const [isFocused, setIsFocused] = React.useState(false);
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
}

type RichTextEditorProps = {
  label: string;
  name: string;
  control: Control<FieldValues>;
  direction?: Direction;
};

const RichTextEditor = ({
  direction,
  label,
  name,
  control,
}: RichTextEditorProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomEditor
          label={label}
          onChange={onChange}
          value={value}
          direction={direction}
          error={error?.message}
        />
      )}
    />
  );
};

export default RichTextEditor;
