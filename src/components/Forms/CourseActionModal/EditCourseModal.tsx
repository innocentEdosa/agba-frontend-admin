import { Modal } from "@/atoms";
import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Course, UpdateCourseType } from "@/types";
import { toast } from "react-toastify";
import CourseActionUI from "./CourseActionUi";
import { useUpdateCourse } from "@/api/hooks/mutations/courses";
import { PriceType } from "@/constants/course";

type EditModalProps = {
  show: boolean;
  onDismiss: () => void;
  initialData: Course | null;
};

const EditCourseModal = ({ show, onDismiss, initialData }: EditModalProps) => {
  const { mutate, isPending } = useUpdateCourse();
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditCourse = useCallback(
    (params: UpdateCourseType) => {
      mutate(
        { id: initialData?.id!, ...params },
        {
          onSuccess: () => {
            toast.success("Course updated successfully");
            onDismiss();
          },
        }
      );
    },
    [initialData]
  );

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        avatar: undefined,
        author_id: undefined,
        price_type: initialData?.price_type || undefined,
        price_value: initialData?.price_value || undefined,
      });
    }
  }, [initialData]);

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <CourseActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleEditCourse)}
        type="Edit"
        register={register}
        control={control}
        errors={errors}
        defaultValues={initialData!}
      />
    </Modal>
  );
};

const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  short_description: yup.string(),
  rating: yup.number().optional(),
  author_id: yup.string().optional(),
  category_id: yup.string(),
  sub_category_id: yup.string(),
  is_featured: yup.boolean(),
  is_coming: yup.boolean(),
  price_value: yup.number().nullable(),
  price_type: yup.string().oneOf(Object.values(PriceType)).nullable(),
  avatar: yup.mixed(),
});

export default EditCourseModal;
