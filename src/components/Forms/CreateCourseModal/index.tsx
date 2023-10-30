import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createCourseModal.module.css";
import {
  Button,
  Select,
  Switch,
  TextField,
  Textarea,
  UploadImageInput,
} from "@/atoms";
import { AddIcon } from "@/Vectors";
import { useResponsive } from "@/hooks";
import { CreateCourseType, Direction } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { useGetAuthors } from "@/api/hooks/queries/authors";
import { useGetCategories } from "@/api/hooks/queries/categories";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCourse } from "@/api/hooks/mutations/courses";
import { toast } from "react-toastify";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateCourseModal = ({ show, onDismiss }: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { isMobile } = useResponsive();
  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;
  const { data: authorsData } = useGetAuthors({});
  const { data: categoriesData } = useGetCategories({});
  const { mutate, isPending } = useCreateCourse();

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

  const authorsOption = useMemo(() => {
    if (!authorsData) return [];
    return authorsData?.data.map((author) => {
      const label = `${author?.first_name} ${author?.last_name}`;
      const value = author?.id;
      return { label, value };
    });
  }, [authorsData]);

  const onsubmit = (data: FieldValues) => {
    mutate(data as CreateCourseType, {
      onSuccess() {
        toast.success("Author Created Successfully");
        reset();
        onDismiss();
      },
    });
  };

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <div className={styles.modal}>
        <h2 className=" heading_sm6">Create Course</h2>
        <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
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
            error={errors?.avatar?.message}
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
            placeholder="6,500"
            direction={direction}
            {...register("rating")}
            error={errors?.price?.message}
          />
          <TextField
            label="Price Value"
            placeholder="6,500"
            direction={direction}
            {...register("price")}
            error={errors?.price?.message}
          />
          <Select
            label="category"
            options={categoriesOption}
            placeholder="Career Growth"
            direction={direction}
            // @ts-ignore
            control={control}
            name="category_id"
          />
          <Select
            label="Sub-category"
            options={subCategoriesOptions}
            placeholder="Self Development"
            direction={direction}
            // @ts-ignore
            control={control}
            name="sub_category_id"
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
          />
          <Switch
            label="Coming Soon"
            direction={direction}
            {...register("is_coming")}
          />
          <Button type="submit">
            <AddIcon /> <span>Create Course</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup
    .string()
    .required("Please provide a description for the coure"),
  short_description: yup
    .string()
    .required("Please provide a short description for the course"),
  rating: yup.number().optional(),
  author_id: yup.string().required("Please select an author for this course"),
  category_id: yup
    .string()
    .required("Please provide a category for this course"),
  sub_category_id: yup.string().optional(),
  is_featured: yup.boolean().default(false),
  is_coming: yup.boolean().default(false),
  price: yup.string().optional(),
  avatar: yup.mixed().required("Please provide an image for this course"),
});

export default CreateCourseModal;
