import { ChangeEvent, ChangeEventHandler } from "react";
import { Direction } from "./shared";
export type Option = {
  label: string;
  value: string;
};

export type SelectType = {
  label?: string;
  options: Option[];
  placeholder: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRtl?: boolean;
  selectMultiple?: boolean;
  fullWidth?: boolean;
  name: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  defaultValue?: string;
  direction?: Direction;
  error?: string;
};
