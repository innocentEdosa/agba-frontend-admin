"use client"

import React, { useEffect, useState } from "react";
import {
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  components,
  SelectInstance,
} from "react-select";
import AsyncSelect from "react-select/async";
import style from "./select.module.css"
import { CheckMark, ChevronDown } from "@/Vectors";

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
};

const SelectComponent = React.forwardRef<SelectInstance, SelectType>(
  (
    {
      isClearable = true,
      isSearchable = true,
      isDisabled,
      isLoading,
      label,
      name,
      placeholder,
      options = [],
      selectMultiple = false,
      isRtl = false,
      defaultValue,
      onChange,
      onBlur,
    },
    ref
  ) => {
    const DropdownIndicator = (
      props: JSX.IntrinsicAttributes &
        DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
    ) => {
      return (
        <components.DropdownIndicator {...props}>
          {props.selectProps.menuIsOpen ? (
            <ChevronDown />
          ) : (
            <ChevronDown />
          )}
        </components.DropdownIndicator>
      );
    };

    const [value, setValue] = useState<Option>();

    useEffect(() => {
      const defaultOption = options.find(
        (p: Option) => p?.value === defaultValue
      );
      if (defaultOption) {
        setValue(defaultOption);
      }
    }, [defaultValue]);

    const Option = (
      props: JSX.IntrinsicAttributes &
        OptionProps<unknown, boolean, GroupBase<unknown>>
    ) => {
      return (
        <components.Option {...props}>
          {props.label}
          {props.isSelected && <CheckMark />}
        </components.Option>
      );
    };

    const loadOptions = (
      inputValue: string,
      callback: (options: Option[]) => void
    ) => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );

      callback(filteredOptions);
    };

    const onChangeHandler = (selectedValue: any) => {
      setValue(selectedValue);
      onChange?.({
        //@ts-ignore
        target: {
          name,
          value: selectedValue?.value,
        },
      });
    };

    return (
      <label className={style.selectWrapper}>
        {label && <span className="selectLabel">{label}ss</span>}
        <AsyncSelect
          tabSelectsValue
          ref={ref}
          value={value}
          className="select"
          classNamePrefix={"select"}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isMulti={selectMultiple}
          placeholder={placeholder}
          components={{ DropdownIndicator, Option }}
          isClearable={isClearable}
          isRtl={isRtl}
          defaultOptions
          isSearchable={isSearchable}
          name={name}
          loadOptions={loadOptions}
          onBlur-={onBlur}
          onChange={onChangeHandler}
        />
      </label>
    );
  }
);

export default SelectComponent;