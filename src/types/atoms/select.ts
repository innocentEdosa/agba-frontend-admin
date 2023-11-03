import { ChangeEvent, ChangeEventHandler } from "react";
import { Direction } from "./shared";
import { Control } from "react-hook-form";
export type Option = {
  label: string;
  value: string;
};

export type SelectType = {
  options: Option[];
  label: string;
  direction?: Direction;
  placeholder?: string;
  error?: string;
  control: Control<any>;
  name: string;
  defaultValue?: string;
};

export type MultiSelectType = {
  defaultValues?: string[];
} & Omit<SelectType, "defaultValue">;
