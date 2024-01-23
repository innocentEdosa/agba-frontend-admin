import React, { BaseSyntheticEvent, useMemo } from "react";
import styles from "./createAuthorModal.module.css";
import { Button, Switch, TextField, Textarea, UploadImageInput } from "@/atoms";
import { CreateAuthor, Direction, UpdateAuthorParams } from "@/types";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGetCategories } from "@/api/hooks/queries/categories";
import { useResponsive } from "@/hooks";

type CreateAuthorType = Omit<
  CreateAuthor,
  "id" | "first_name" | "last_name"
> & {
  fullName: string;
};

type UpdateAuthorType = Omit<
  UpdateAuthorParams,
  "id" | "first_name" | "last_name"
> & {
  fullName?: string;
};

export type AuthorActionUiProps<T extends "Edit" | "Create"> = {
  type: T;
  isPending: boolean;
  register: T extends "Create"
    ? UseFormRegister<CreateAuthorType>
    : UseFormRegister<UpdateAuthorType>;
  control: T extends "Create"
    ? Control<CreateAuthorType>
    : Control<UpdateAuthorType>;
  errors: T extends "Create"
    ? FieldErrors<CreateAuthorType>
    : FieldErrors<UpdateAuthorType>;
  defaultValues?: Record<string, any>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const AuthorActionUI = <T extends "Edit" | "Create" = "Create">({
  type,
  isPending,
  onSubmit,
  register,
  errors,
  control,
  defaultValues,
}: AuthorActionUiProps<T>) => {
  const { isMobile } = useResponsive();
  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;

  return (
    <div className={styles.modal}>
      <h2 className=" heading_sm6">{type} Author</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          label="Full Name"
          placeholder="John Donald"
          direction={direction}
          {...register("fullName")}
          error={errors?.fullName?.message}
        />
        <UploadImageInput
          label="Upload Image"
          name="avatar"
          // @ts-ignore
          control={control}
          direction={direction}
        />
        <Textarea
          label="Bio"
          placeholder="Authors bio"
          rows={4}
          direction={direction}
          {...register("details")}
        />
        <TextField
          label="email"
          placeholder="user@example.com"
          direction={direction}
          {...register("email")}
          error={errors?.email?.message}
        />
        <TextField
          label="Work History"
          placeholder="Developer advocate - Github"
          direction={direction}
          {...register("work_history")}
          error={errors.work_history?.message}
        />
        <TextField
          label="website"
          placeholder="https://user.com"
          direction={direction}
          {...register("website")}
          error={errors?.website?.message}
        />
        <TextField
          type="url"
          label="Linkedin"
          placeholder="https://linkedin.com/in/user"
          direction={direction}
          {...register("linkedIn")}
          error={errors?.linkedIn?.message}
        />
        <TextField
          label="Rating"
          placeholder="4.6"
          direction={direction}
          {...register("rating")}
          error={errors?.rating?.message}
        />
        <Switch
          label="Featured"
          direction={direction}
          {...register("is_featured")}
        />
        <Button>
          {!isPending ? (
            <>
              <AddIcon />{" "}
              <span>{type === "Edit" ? "Update" : type} Author</span>
            </>
          ) : (
            <LoaderIcon />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuthorActionUI;
