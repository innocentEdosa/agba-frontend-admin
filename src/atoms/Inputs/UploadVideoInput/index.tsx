import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import style from "./uploadVideoInput.module.css";
import { Direction } from "@/types";
import { AddVideoIcon } from "@/Vectors";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import { Uploader } from "@/api/services/upload";
import { VideoPlayer } from "@/components";
import { makeFileSizeReadable } from "@/utils/makeFileSizeReadable";
import ProgressBar from "@/atoms/Progress";

export type UploadImageInputProps = {
  accept?: string[];
  direction?: Direction;
  label: string;
  name: string;
  control: Control<FieldValues>;
};

const VideoInput = ({
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
  const [percentage, setPercentage] = useState(0);
  const [preview, setPreview] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!!acceptedFiles.length) {
      setFile(acceptedFiles[0]);
      onChange(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, inputRef, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "video/*": [".mp4", ".mov", ".avi", ".mkv"],
      },
      maxFiles: 1,
    });

  useEffect(() => {
    if (file) {
      let pctage = 0;
      const upload = new Uploader({
        chunkSize: 10,
        file: file,
        fileName: file.name,
      });

      upload
        .onProgress(({ percentage: newPercentage }) => {
          if (newPercentage !== pctage) {
            setPercentage(newPercentage as number);
          }
        })
        .onError((error) => {
          setFile(null);
          console.error(error);
        });

      upload.start();
    }
  }, [file]);

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [file]);

  return (
    <div className={style.wrapper} data-direction={direction}>
      {label && <span className={style.label}>{label}</span>}
      <div>
        <div className={style.dropboxWrapper}>
          <div className={style.dropbox} {...getRootProps()}>
            <input {...getInputProps({})} />
            <span className={style.icon}>
              <AddVideoIcon fill="#001F80" />
            </span>
            <div>
              <button type="button">Click to upload</button>{" "}
              <span>or drag and drop</span>
            </div>
            <span className={style.info}>PNG, JPG (max 400x80px)</span>
          </div>
        </div>
        {file && (
          <div className={style.previewWWrapper}>
            <div className={style.previewInfo}>
              <div className={style.videoWrapper}>
                <VideoPlayer src={preview} />
              </div>
              <div className={style.videoInfo}>
                <span>{file.name}</span>
                <span>{makeFileSizeReadable(file.size)}</span>
                <ProgressBar
                  percentage={percentage}
                  label="Video upload progress"
                />
              </div>
            </div>
          </div>
        )}
        {error && <span className={style.error}>{error.message}</span>}
      </div>
    </div>
  );
};

const UploadVideoInput = ({
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
        <VideoInput
          label={label}
          direction={direction}
          accept={accept}
          onChange={onChange}
          error={error}
        />
      )}
    />
  );
};

export default UploadVideoInput;
