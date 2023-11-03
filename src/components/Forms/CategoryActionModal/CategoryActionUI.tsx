import React, { BaseSyntheticEvent, useMemo } from "react";
import styles from "./createCategoryModal.module.css";
import { Button, Select, TextField } from "@/atoms";
import {
  CategoryType,
  CreateCategoryParam,
  Direction,
  UpdateCategoryType,
} from "@/types";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGetCategories } from "@/api/hooks/queries/categories";

export type CategoryActionUiProps<T extends "Edit" | "Create"> = {
  type: T;
  isPending: boolean;
  register: T extends "Create"
    ? UseFormRegister<CreateCategoryParam>
    : UseFormRegister<UpdateCategoryType>;
  control: T extends "Create"
    ? Control<CreateCategoryParam>
    : Control<UpdateCategoryType>;
  errors: T extends "Create"
    ? FieldErrors<CreateCategoryParam>
    : FieldErrors<UpdateCategoryType>;
  defaultValues?: Record<string, any>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const CategoryActionUI = <T extends "Edit" | "Create" = "Create">({
  type,
  isPending,
  onSubmit,
  register,
  errors,
  control,
  defaultValues,
}: CategoryActionUiProps<T>) => {
  const { data: categoriesData } = useGetCategories({});

  const categoriesOption = useMemo(() => {
    if (!categoriesData?.top_category) return [];
    return categoriesData.top_category.map((category: CategoryType) => {
      const label = category?.title;
      const value = category?.id;
      return { label, value };
    });
  }, [categoriesData]);

  return (
    <div className={styles.modal}>
      <h2 className=" heading_sm6">{type} Category</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          label="Category"
          placeholder="Career Growth"
          direction={Direction.Vertical}
          {...register("title")}
          error={errors.title?.message}
        />
        <Select
          label="Sub-category"
          options={categoriesOption}
          placeholder="Self Development"
          direction={Direction.Vertical}
          {...register("parent_id")}
          defaultValue={defaultValues?.parent_id}
          // @ts-ignore
          control={control}
          name="parent_id"
        />
        <Button>
          {!isPending ? (
            <>
              <AddIcon /> <span>{type} Category</span>
            </>
          ) : (
            <LoaderIcon />
          )}
        </Button>
      </form>
    </div>
  );
};

export default CategoryActionUI;
