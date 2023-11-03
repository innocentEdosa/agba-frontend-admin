import { Modal } from "@/atoms";
import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { Author, UpdateAuthorType } from "@/types";
import { toast } from "react-toastify";
import { useUpdateAuthor } from "@/api/hooks/mutations/author";
import AuthorActionUI from "./AuthorActionUi";

type EditAuthorModalProps = {
  show: boolean;
  onDismiss: () => void;
  initialData: Author | null;
};

const EditAuthorModal = ({
  show,
  onDismiss,
  initialData,
}: EditAuthorModalProps) => {
  const { mutate, isPending } = useUpdateAuthor();
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditAuthor = useCallback(
    (params: UpdateAuthorType) => {
      mutate(
        { id: initialData?.id!, ...params },
        {
          onSuccess: () => {
            toast.success("Author updated successfully");
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
        fullName: [initialData.first_name, initialData.last_name].join(" "),
        avater: undefined,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (errors) {
      console.table(errors);
    }
  }, [errors]);

  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <AuthorActionUI
        isPending={isPending}
        onSubmit={handleSubmit(handleEditAuthor)}
        type="Edit"
        register={register}
        errors={errors}
        control={control}
      />
    </Modal>
  );
};

const schema = yup.object().shape({
  fullName: yup.string(),
  details: yup.string().nullable(),
  work_history: yup.string(),
  rating: yup.number(),
  avater: yup.mixed(),
  email: yup.string().email(),
  linkedIn: yup.string().optional(),
  website: yup.string().optional(),
  phone_number: yup.string(),
  is_featured: yup.boolean(),
});

export default EditAuthorModal;
