import React, { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckMark, ChevronDown } from "@/Vectors";
import styles from "./select.module.css";
import { Direction, Option } from "@/types";
import { Control, Controller, FieldValues } from "react-hook-form";

export type SelectType = {
  options: Option[];
  label: string;
  direction?: Direction;
  placeholder?: string;
  error?: string;
  control: Control<FieldValues>;
  name: string;
};

const Select = ({
  options = [],
  label,
  direction,
  placeholder,
  name,
  control,
}: SelectType) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const filteredOptions = useMemo(() => {
    return query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });
  }, [options, query]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Combobox
          className={styles.wrapper}
          data-direction={direction}
          name={name}
          as={"div"}
          // defaultValue={selectedOption}
          onChange={(value) => {
            setSelectedOption(value);
            onChange(value);
          }}
          value={selectedOption}>
          {label && (
            <Combobox.Label className={styles.label}>{label}</Combobox.Label>
          )}
          <div className={styles.selectWrapper}>
            <div className={styles.inputWrapper}>
              <Combobox.Input
                data-error={!!error}
                placeholder={placeholder}
                className={styles.input}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(selectedValue) => {
                  return options.find(
                    (option) => option.value === selectedValue
                  )?.label!;
                }}
              />
              <Combobox.Button className={styles.icon}>
                <ChevronDown />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}>
              <Combobox.Options className={styles.selectMenu}>
                {!!!filteredOptions.length && (
                  <span className={styles.info}>No options available</span>
                )}
                {!!filteredOptions.length &&
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      placeholder={placeholder}
                      key={option.value}
                      value={option.value}
                      className={styles.menuItem}>
                      {({ active, selected }) => (
                        <>
                          <span>{option.label}</span>
                          {selected && <CheckMark size={20} />}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
            {error && <span className={styles.error}>{error.message}</span>}
          </div>
        </Combobox>
      )}
    />
  );
};

export default Select;
