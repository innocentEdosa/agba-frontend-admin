import { Button, ProgressBar, UploadVideoInput } from "@/atoms";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./createVideoModal.module.css";
import { ButtonVariant, Direction } from "@/types";
import clsx from "clsx";
import VideoUpload from "@/atoms/Inputs/UploadVideoInput/VideoUpload";
import useUploader from "@/hooks/useUploader";
import { LoaderIcon } from "@/Vectors";
import { useUpdateVideo } from "@/api/hooks/mutations/video";
import { toast } from "react-toastify";

type VideoUploaderProps = {
  closeModal: () => void;
  courseId: string;
  videoId: string;
};

const VideoUploader = ({
  closeModal,
  courseId,
  videoId,
}: VideoUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const { mutate, isPending } = useUpdateVideo(courseId);
  const {
    start,
    abort,
    percentage,
    data,
    error,
    isUploading,
    isIdle,
    isCompleted,
    isAborted,
  } = useUploader({ file });

  const handleChange = useCallback((data: { file: File; duration: number }) => {
    setFile(data.file);
    setDuration(data.duration);
  }, []);

  const handleCancel = () => {
    if (isUploading) abort();
    closeModal();
  };

  useEffect(() => {
    if (data) {
      mutate(
        {
          url: data.aws_url,
          s3_path: data.s3Path,
          id: videoId,
          ext: getFileExt(file!),
          size: file?.size,
          duration: parseInt(duration.toString()),
        },
        {
          onSuccess: () => {
            toast.success("Uploaded video successfully!");
            closeModal();
          },
        }
      );
    }
  }, [data, file]);

  const handleSubmit = () => {
    // size
    // duration
    // ext
    // public_id
    // url
    // asset_id
  };

  return (
    <div className={clsx(styles.modal, styles.videoUploadModal)}>
      <VideoUpload label="" onChange={handleChange} />
      {!!percentage && (
        <ProgressBar label="Video upload progress" percentage={percentage} />
      )}
      <div className={styles.btnGroup}>
        {(isIdle || isAborted) && (
          <Button
            variant={ButtonVariant.Ghost}
            className={styles.btn}
            onClick={handleCancel}>
            Cancel
          </Button>
        )}
        {!isCompleted && (
          <Button className={styles.btn} onClick={start} disabled={isUploading}>
            {(isIdle || isAborted) && "Upload"}
            {isUploading && (
              <>
                <LoaderIcon /> <span>Uploading</span>
              </>
            )}
          </Button>
        )}
        {!isCompleted && isUploading && (
          <Button
            variant={ButtonVariant.Danger}
            className={styles.btn}
            onClick={abort}
            disabled={isIdle}>
            Abort
          </Button>
        )}
        {isCompleted && (
          <Button
            className={styles.btn}
            onClick={handleCancel}
            disabled={isUploading}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

const getFileExt = (file: File) => {
  return file.name.split(".").pop();
};

export default VideoUploader;
