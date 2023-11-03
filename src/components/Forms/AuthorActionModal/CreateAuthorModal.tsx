import { Modal } from "@/atoms";
import React, { useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { CreateAuthor } from "@/types";
import { toast } from "react-toastify";
import { useCreateAuthor } from "@/api/hooks/mutations/author";
import AuthorActionUI from "./AuthorActionUi";

type CreateAuthorModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateAuthorModal = ({ show, onDismiss }: CreateAuthorModalProps) => {
  const { mutate, isPending } = useCreateAuthor();
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateAuthor = useCallback((data: FieldValues) => {
    const [first_name, ...rest] = data.fullName.split(" ");
    const params = {
      first_name,
      last_name: rest.join(" "),
      ...data,
    } as CreateAuthor;
    mutate(params, {
      onSuccess() {
        toast.success("Author Created Successfully");
        reset();
        onDismiss();
      },
    });
  }, []);

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <AuthorActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleCreateAuthor)}
        type="Create"
        register={register}
        errors={errors}
        control={control}
      />
    </Modal>
  );
};

const schema = yup.object().shape({
  fullName: yup.string().required("Author's name must be provided"),
  details: yup.string().nullable(),
  work_history: yup.string().required(),
  rating: yup.number(),
  avater: yup.mixed(),
  email: yup.string().email().required(),
  phone_number: yup.string(),
  linkedIn: yup.string().optional(),
  website: yup.string().optional(),
  is_featured: yup.boolean(),
});

export default CreateAuthorModal;
