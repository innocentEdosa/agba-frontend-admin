import { Uploader } from "@/api/services/upload";
import React from "react";

const useMultipartUploader = ({ file }: { file?: File }) => {
  const [percentage, setPercentage] = React.useState(0);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const uploader = React.useRef<Uploader | undefined>(undefined);

  React.useEffect(() => {
    if (file) {
      let percent: number | undefined = undefined;
      uploader.current = new Uploader({
        chunkSize: 10,
        file: file,
        fileName: file.name,
      });

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
        });

      return () => {
        if (uploader.current) {
          uploader.current.abort();
        }
      };
    }
  }, [file, percentage]);

  const start = React.useCallback(() => {
    if (uploader.current) {
      uploader.current.start();
    }
  }, []);

  const abort = React.useCallback(() => {
    if (uploader.current) {
      uploader.current.abort();
    }
  }, []);

  return { percentage, error, start, abort };
};

export default useMultipartUploader;
