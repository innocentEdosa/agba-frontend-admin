import React, { BaseSyntheticEvent, useEffect, useMemo } from "react";
import styles from "./createCourseModal.module.css";
import {
  Button,
  MultiSelect,
  Select,
  Switch,
  TextField,
  Textarea,
  UploadImageInput,
} from "@/atoms";
import { CreateCourseType, Direction, UpdateCourseType } from "@/types";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGetCategories } from "@/api/hooks/queries/categories";
import { useResponsive } from "@/hooks";
import { useGetAuthors } from "@/api/hooks/queries/authors";
import { PriceType } from "@/constants/course";

export type CourseActionUiProps<T extends "Edit" | "Create"> = {
  type: T;
  isPending: boolean;
  register: T extends "Create"
    ? UseFormRegister<CreateCourseType>
    : UseFormRegister<UpdateCourseType>;
  control: T extends "Create"
    ? Control<CreateCourseType>
    : Control<UpdateCourseType>;
  errors: T extends "Create"
    ? FieldErrors<CreateCourseType>
    : FieldErrors<UpdateCourseType>;
  defaultValues?: Record<string, any>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const CourseActionUI = <T extends "Edit" | "Create">({
  type,
  isPending,
  onSubmit,
  register,
  errors,
  control,
  defaultValues,
}: CourseActionUiProps<T>) => {
  const { isMobile } = useResponsive();
  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;
  const { data: authorsData } = useGetAuthors({});
  const { data: categoriesData } = useGetCategories({});

  const categoriesOption = useMemo(() => {
    if (!categoriesData?.top_category) return [];
    return categoriesData.top_category.map((category) => ({
      label: category?.title,
      value: category.id,
    }));
  }, [categoriesData]);

  const subCategoriesOptions = useMemo(() => {
    if (!categoriesData) return [];
    const categories = categoriesOption
      .map((category) => categoriesData[category.label] || [])
      .flat();
    return categories.map((subCategory) => ({
      value: subCategory?.id,
      label: subCategory?.title,
    }));
  }, [categoriesData, categoriesOption]);

  const price_type_options = useMemo(() => {
    return Object.values(PriceType).map((value) => ({ label: value, value }));
  }, []);

  const authorsOption = useMemo(() => {
    if (!authorsData) return [];
    return authorsData?.data.map((author) => {
      const label = `${author?.first_name} ${author?.last_name}`;
      const value = author?.id;
      return { label, value };
    });
  }, [authorsData]);

  return (
    <div className={styles.modal}>
      <h2 className=" heading_sm6">{type} Course</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          label="Course Title"
          placeholder="E.g How to be a good leader"
          direction={direction}
          {...register("title")}
          error={errors?.title?.message}
        />
        <UploadImageInput
          label="Upload Image"
          name="avatar"
          // @ts-ignore
          control={control}
          direction={direction}
        />
        <Textarea
          label="Main Description"
          placeholder="Description about the course"
          rows={4}
          direction={direction}
          {...register("description")}
          error={errors?.description?.message}
        />
        <Textarea
          label="Short Description"
          placeholder="Short description about the course"
          rows={3}
          direction={direction}
          {...register("short_description")}
          error={errors?.short_description?.message}
        />
        <TextField
          label="Rating"
          placeholder="5"
          direction={direction}
          {...register("rating")}
          error={errors?.rating?.message}
        />
        <Select
          label="Price type"
          options={price_type_options}
          placeholder="one-off"
          direction={direction}
          // @ts-ignore
          control={control}
          name="price_type"
          defaultValue={defaultValues?.price_type}
        />
        <TextField
          label="Price Value"
          placeholder="6,500"
          direction={direction}
          {...register("price_value")}
          error={errors?.price_value?.message}
        />
        <TextField
          label="Discount Price"
          placeholder="6,500"
          direction={direction}
          {...register("discount_price")}
          error={errors?.discount_price?.message}
        />
        <Select
          label="Category"
          options={categoriesOption}
          placeholder="Career Growth"
          direction={direction}
          // @ts-ignore
          control={control}
          name="category_id"
          defaultValue={defaultValues?.category_id}
        />
        <Select
          label="Sub-category"
          options={subCategoriesOptions}
          placeholder="Self Development"
          direction={direction}
          // @ts-ignore
          control={control}
          name="sub_category_id"
          defaultValue={defaultValues?.sub_category_id}
        />
        <Switch
          label="Featured"
          direction={direction}
          {...register("is_featured")}
        />
        <Select
          label="Author"
          options={authorsOption}
          placeholder="Authors name"
          direction={direction}
          // @ts-ignore
          control={control}
          name="author_id"
          defaultValue={defaultValues?.author_id}
        />
        {/* <MultiSelect
          label="Author"
          options={authorsOption}
          placeholder="Authors name"
          direction={direction}
          // @ts-ignore
          control={control}
          name="author_id"
          defaultValues={[defaultValues?.author_id]}
        /> */}
        <Switch
          label="Coming Soon"
          direction={direction}
          {...register("is_coming")}
        />
        <Button>
          {!isPending ? (
            <>
              <AddIcon />{" "}
              <span>{type === "Edit" ? "Update" : type} Course</span>
            </>
          ) : (
            <LoaderIcon />
          )}
        </Button>
      </form>
    </div>
  );
};

export default CourseActionUI;
