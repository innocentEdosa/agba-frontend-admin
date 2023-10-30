import { UploadVideoInput } from "@/atoms";
import React from "react";

const UploadVideo = () => {
  return (
    <div>
      <UploadVideoInput
        label="Upload Video"
        name="avatar"
        // @ts-ignore
        control={{}}
      />
    </div>
  );
};

export default UploadVideo;
