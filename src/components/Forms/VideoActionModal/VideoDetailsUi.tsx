import React, { BaseSyntheticEvent } from "react";
import styles from "./createVideoModal.module.css";
import { Button, Switch, TextField, Textarea } from "@/atoms";
import { ButtonVariant, Direction } from "@/types";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useResponsive } from "@/hooks";
import { CreateVideoDetails, UpdateVideo } from "@/types/video";
import NotificationCard from "@/atoms/NotificationCard";

export type VideoDetailsUiProps<T extends "Edit" | "Create"> = {
  type: T;
  isPending: boolean;
  register: T extends "Create"
    ? UseFormRegister<CreateVideoDetails>
    : UseFormRegister<UpdateVideo>;
  control: T extends "Create"
    ? Control<CreateVideoDetails>
    : Control<UpdateVideo>;
  errors: T extends "Create"
    ? FieldErrors<CreateVideoDetails>
    : FieldErrors<UpdateVideo>;
  defaultValues?: Record<string, any>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  changeStep: (step: number) => void;
  closeModal: () => void;
};

const VideoDetailsUI = <T extends "Edit" | "Create" = "Create">({
  type,
  isPending,
  onSubmit,
  register,
  errors,
  control,
  defaultValues,
  changeStep,
  closeModal,
}: VideoDetailsUiProps<T>) => {
  const { isMobile } = useResponsive();
  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;

  return (
    <div className={styles.modal}>
      <h2 className=" heading_sm6">{type} Video</h2>
      {type === "Create" && (
        <NotificationCard variant="info">
          Once you click on create, the video details is saved and you can
          upload the video now or choose to do so later by editing the video
        </NotificationCard>
      )}
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          label="Video Title"
          placeholder="How to make money"
          direction={direction}
          {...register("title")}
          error={errors?.title?.message}
        />
        <Textarea
          label="Video Description"
          placeholder="description about this video"
          rows={4}
          direction={direction}
          {...register("description")}
          error={errors?.description?.message}
        />
        <TextField
          label="Video Position"
          type="number"
          placeholder="2"
          direction={direction}
          {...register("position")}
          error={errors?.position?.message}
        />
        <Switch
          label="Video Preview"
          direction={direction}
          {...register("is_preview")}
        />
        <div className={styles.btnGroup}>
          <Button
            variant={ButtonVariant.Ghost}
            className={styles.btn}
            type="button"
            onClick={closeModal}>
            Cancel
          </Button>
          <Button className={styles.btn}>
            {!isPending ? (
              <>
                {type === "Create" && <AddIcon size={16} />}
                {type === "Create" ? <span>Create video</span> : "Update"}
              </>
            ) : (
              <LoaderIcon />
            )}
          </Button>
          {type === "Edit" && (
            <Button
              className={styles.btn}
              type="button"
              variant={ButtonVariant.Neutral}
              onClick={() => changeStep(1)}>
              Upload Video
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VideoDetailsUI;
