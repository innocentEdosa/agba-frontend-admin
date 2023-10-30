import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createVideoModal.module.css";
import {
  Button,
  Select,
  Switch,
  TextField,
  Textarea,
  UploadVideoInput,
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

const CreateVideoModal = ({ show, onDismiss }: CategoryModalProps) => {
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
            label="Video Title"
            placeholder="E.g How to be a good leader"
            direction={direction}
            {...register("title")}
            error={errors?.title?.message}
          />
          <UploadVideoInput
            label="Upload Video"
            name="avatar"
            // @ts-ignore
            control={control}
          />
          <Textarea
            label="Video Description"
            placeholder="Description about this video"
            rows={4}
            direction={direction}
            {...register("description")}
            error={errors?.description?.message}
          />
          <TextField
            label="Rating"
            placeholder="6,500"
            direction={direction}
            {...register("position")}
            error={errors?.position?.message}
          />
          <Select
            label="course"
            options={categoriesOption}
            placeholder="Career Growth"
            direction={direction}
            name="course_id"
            // @ts-ignore
            control={control}
          />
          <Switch
            label="Featured"
            direction={direction}
            {...register("is_preview")}
          />
          <Button type="submit">
            <AddIcon /> <span>Create Video</span>
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
  course_id: yup.string().required("Please select an author for this course"),
  is_preview: yup.boolean().default(false),
  position: yup.string().optional(),
  video: yup.mixed().required("Please upload a video"),
});

export default CreateVideoModal;
