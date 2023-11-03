import { Modal } from "@/atoms";
import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import CategoryActionUI from "./CategoryActionUI";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdateCategory } from "@/api/hooks/mutations/categories";
import { CategoryType, UpdateCategoryType } from "@/types";
import { toast } from "react-toastify";

type EditCategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  initialData: CategoryType | null;
};

const EditCategoryModal = ({
  show,
  onDismiss,
  initialData,
}: EditCategoryModalProps) => {
  const { mutate, isPending } = useUpdateCategory();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        parent_id: initialData.parent_id || "",
      });
    }
  }, [initialData]);

  const handleEditCategory = useCallback(
    (params: UpdateCategoryType) => {
      mutate(
        { id: initialData?.id!, ...params },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            onDismiss();
          },
        }
      );
    },
    [initialData]
  );

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <CategoryActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleEditCategory)}
        type="Edit"
        register={register}
        control={control}
        errors={errors}
        defaultValues={initialData!}
      />
    </Modal>
  );
};

export default EditCategoryModal;

const schema = yup.object().shape({
  title: yup.string(),
  parent_id: yup.string(),
});
