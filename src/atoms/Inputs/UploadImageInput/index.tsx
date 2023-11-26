import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import style from "./uploadImageInput.module.css";
import { Direction } from "@/types";
import { AddImageIcon } from "@/Vectors";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

export type UploadImageInputProps = {
  accept?: string[];
  direction?: Direction;
  label: string;
  name: string;
  control: Control<FieldValues>;
};

const ImageInput = ({
  label,
  accept,
  onChange,
  error,
  direction,
}: {
  label: string;
  accept?: string[];
  onChange: (...event: any[]) => void;
  error?: FieldError;
  direction?: Direction;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    onChange(acceptedFiles[0]);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive, inputRef, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      maxFiles: 1,
    });

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    return () => URL.revokeObjectURL(preview);
  }, [file, preview]);

  return (
    <div className={style.wrapper} data-direction={direction}>
      {label && <span className={style.label}>{label}</span>}
      <div>
        <div className={style.dropboxWrapper}>
          {!!preview ? (
            <img className={style.imagePreview} src={preview} alt="" />
          ) : (
            <div className={style.addImageIcon}>
              <AddImageIcon fill="#001F80" />
            </div>
          )}
          <div className={style.dropbox} {...getRootProps()}>
            <input {...getInputProps({})} />
            <div>
              <button type="button">Click to upload</button>{" "}
              <span>or drag and drop</span>
            </div>
            <span className={style.info}>PNG, JPG (max 400x80px)</span>
          </div>
        </div>
        {error && <span className={style.error}>{error.message}</span>}
      </div>
    </div>
  );
};

const UploadImageInput = ({
  accept,
  direction,
  label,
  name,
  control,
}: UploadImageInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <ImageInput
          accept={accept}
          direction={direction}
          label={label}
          error={error}
          onChange={onChange}
        />
      )}
    />
  );
};

export default UploadImageInput;
