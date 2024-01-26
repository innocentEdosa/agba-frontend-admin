import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import style from "./uploadVideoInput.module.css";
import { Direction } from "@/types";
import { AddVideoIcon } from "@/Vectors";
import { FieldError } from "react-hook-form";
import { VideoPlayer } from "@/components";
import { makeFileSizeReadable } from "@/utils/makeFileSizeReadable";
import ProgressBar from "@/atoms/Progress";
import useUploader from "@/hooks/useUploader";
import { formatDuration } from "@/utils/formatDuration";

const VideoUpload = ({
  label,
  accept,
  onChange,
  error,
  direction,
  setDuration: getDuration,
}: {
  label: string;
  accept?: string[];
  onChange: (...event: any[]) => void;
  error?: FieldError;
  direction?: Direction;
  setDuration?: (duration: number) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [duration, setDuration] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!!acceptedFiles.length) {
        setFile(acceptedFiles[0]);
        onChange({ file: acceptedFiles[0], duration });
      }
    },
    [duration, onChange]
  );

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
      setPreview(URL.createObjectURL(file));
    }

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [file]);

  useEffect(() => {
    if (preview) {
      var media = new Audio(preview);
      media.onloadedmetadata = function () {
        setDuration(media.duration);
        getDuration?.(media.duration);
      };
    }
  }, [preview]);

  useEffect(() => {
    if (file && duration) {
      onChange({ file, duration });
    }
  }, [duration, file]);

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
                <span>
                  <strong>Name:</strong> {file.name}
                </span>
                <span>
                  <strong>Duration:</strong> {formatDuration(duration)}
                </span>
                <span>
                  <strong>Size:</strong> {makeFileSizeReadable(file.size)}
                </span>
              </div>
            </div>
          </div>
        )}
        {error && <span className={style.error}>{error.message}</span>}
      </div>
    </div>
  );
};

export default VideoUpload;
