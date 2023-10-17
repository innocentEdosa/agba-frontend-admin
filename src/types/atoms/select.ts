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
  onChange: (params: Option) => void;
  onBlur: () => void;
  defaultValue?: string;
  direction?: Direction;
};
