import { Modal } from "@/atoms";
import React, { useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { CreateCourseType } from "@/types";
import { toast } from "react-toastify";
import CourseActionUI from "./CourseActionUi";
import { useCreateCourse } from "@/api/hooks/mutations/courses";
import { PriceType } from "@/constants/course";

type CreateCourseModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateCourseModal = ({ show, onDismiss }: CreateCourseModalProps) => {
  const { mutate, isPending } = useCreateCourse();
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateCourse = useCallback((data: FieldValues) => {
    mutate(data as CreateCourseType, {
      onSuccess() {
        toast.success("Course Created Successfully");
        reset();
        onDismiss();
      },
    });
  }, []);

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <CourseActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleCreateCourse)}
        type="Create"
        register={register}
        errors={errors}
        control={control}
      />
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
    .max(300, "Short description should be less than 300 characters")
    .required("Please provide a short description for the course"),
  rating: yup.number().optional(),
  author_id: yup.string().required("Please select an author for this course"),
  category_id: yup
    .string()
    .required("Please provide a category for this course"),
  sub_category_id: yup.string().optional().nullable(),
  is_featured: yup.boolean(),
  is_coming: yup.boolean(),
  price_value: yup.number().nullable(),
  price_type: yup.string().oneOf(Object.values(PriceType)).nullable(),
  discount_price: yup.number().nullable(),
  avatar: yup.mixed(),
});

export default CreateCourseModal;
