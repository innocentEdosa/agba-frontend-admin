import { Modal } from "@/atoms";
import React, { useCallback } from "react";
import * as yup from "yup";
import CategoryActionUI from "./CategoryActionUI";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "@/api/hooks/mutations/categories";
import { CreateCategoryParam } from "@/types";
import { toast } from "react-toastify";

type CreateCategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateCategoryModal = ({ show, onDismiss }: CreateCategoryModalProps) => {
  const { mutate, isPending } = useCreateCategory();
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateCategory = useCallback((params: CreateCategoryParam) => {
    mutate(params, {
      onSuccess: () => {
        toast.success("Category created successfully");
        reset();
        onDismiss();
      },
    });
  }, []);
  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <CategoryActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleCreateCategory)}
        type="Create"
        register={register}
        errors={errors}
        control={control}
      />
    </Modal>
  );
};

export default CreateCategoryModal;

const schema = yup.object().shape({
  title: yup.string().required(),
  parent_id: yup.string(),
});
