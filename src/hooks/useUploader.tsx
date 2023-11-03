import { MultiPartUploader } from "@/api/services/multiPartUpload";
import { Uploader } from "@/api/services/upload";
import React, { useEffect, useState } from "react";

type UploadStatus = "idle" | "uploading" | "completed" | "aborted";

const useUploader = ({ file }: { file: File | null }) => {
  const [percentage, setPercentage] = React.useState(0);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<UploadStatus>("idle");
  const [uploadedVideoData, setUploadedVideoData] = useState<{
    s3Path: string;
    aws_url: string;
    name?: string;
    size?: number;
  } | null>(null);

  const uploader = React.useRef<MultiPartUploader | Uploader | undefined>(
    undefined
  );

  useEffect(() => {
    if (file) {
      // check if file size is greater than 10mb
      // if it's greater than 10mb use multipart upload
      // amazon multipart upload require a file size of at least %mb
      if (file.size > 10 * 2 ** 20) {
        uploader.current = new MultiPartUploader({
          chunkSize: 6,
          file: file,
          fileName: file.name,
        });
      } else {
        uploader.current = new Uploader(file);
      }
    }
  }, [file]);

  const start = React.useCallback(() => {
    if (uploader.current) {
      let percent: number | undefined = undefined;
      uploader.current
        .onProgress(({ percentage: newPercentage }) => {
          if (newPercentage !== percent) {
            percent = percentage;
            setPercentage(newPercentage!);
          }
        })
        .onError((error) => {
          console.log(error);
          setError(error?.message);
        })
        .onComplete((data) => {
          setStatus("completed");
          setUploadedVideoData(data);
        });

      uploader.current.start();
      setStatus("uploading");
    }
  }, [file]);

  const abort = React.useCallback(() => {
    if (uploader.current) {
      uploader.current.abort();
      setStatus("aborted");
      setPercentage(0);
    }
  }, []);

  return {
    percentage,
    error,
    start,
    abort,
    isUploading: status === "uploading",
    isCompleted: status === "completed",
    isIdle: status === "idle",
    isAborted: status === "aborted",
    data: uploadedVideoData,
  };
};

export default useUploader;
