import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createAuthorModal.module.css";
import clsx from "clsx";
import { Button, Select, Switch, TextField, Textarea } from "@/atoms";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { useResponsive } from "@/hooks";
import { CreateAuthor, Direction } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateAuthor } from "@/api/hooks/mutations/author";
import { toast } from "react-toastify";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateAuthorModal = ({ show, onDismiss }: CategoryModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const { isMobile } = useResponsive();
  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;
  const createAuthor = useCreateAuthor();

  const onsubmit = async (data: FieldValues) => {
    const [first_name, ...rest] = data.fullName.split(" ");
    const params = {
      first_name,
      last_name: rest.join(" "),
      ...data,
    } as CreateAuthor;
    await createAuthor.mutate(params, {
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
        <h2 className=" heading_sm6">Create Author</h2>
        <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
          <TextField
            label="Full Name"
            placeholder="John Donald"
            direction={direction}
            {...register("fullName")}
          />
          <Textarea
            label="Bio"
            placeholder="Authors bio"
            rows={4}
            direction={direction}
            {...register("bio")}
          />
          <TextField
            label="email"
            placeholder="user@example.com"
            direction={direction}
            {...register("email")}
          />
          <TextField
            label="Work History"
            placeholder="Developer advocate - Github"
            direction={direction}
            {...register("work_history")}
          />
          <TextField
            label="website"
            placeholder="https://user.com"
            direction={direction}
            {...register("website")}
          />
          <TextField
            type="url"
            label="Linkedin"
            placeholder="https://linkedin.com/in/user"
            direction={direction}
            {...register("linkedin")}
          />
          <TextField
            label="Rating"
            type="number"
            placeholder="4.6"
            direction={direction}
            {...register("rating")}
          />
          <Switch
            label="Featured"
            defaultChecked
            direction={direction}
            {...register("is_featured")}
          />
          <Button>
            {!createAuthor.isPending ? (
              <>
                <AddIcon /> <span>Create Author</span>
              </>
            ) : (
              <LoaderIcon />
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAuthorModal;
