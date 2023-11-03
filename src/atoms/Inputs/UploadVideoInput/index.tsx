import React from "react";
import { Direction } from "@/types";
import { Control, Controller, FieldValues } from "react-hook-form";
import VideoUpload from "./VideoUpload";

export type UploadImageInputProps = {
  accept?: string[];
  direction?: Direction;
  label: string;
  name: string;
  control: Control<FieldValues>;
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
        <VideoUpload
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
