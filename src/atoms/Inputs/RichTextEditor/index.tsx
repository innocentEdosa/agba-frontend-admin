"use client";

import { Direction } from "@/types";

import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("./CustomEditor"), { ssr: false });

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
