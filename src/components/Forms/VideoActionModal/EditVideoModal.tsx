import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/atoms/Modal";
import VideoDetailsUI from "./VideoDetailsUi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import VideoUploader from "./VideoUploadUI";
import { Video } from "@/types";
import { toast } from "react-toastify";
import { useUpdateVideo } from "@/api/hooks/mutations/video";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  defaultData: Video;
};

const EditVideoModal = ({
  show,
  onDismiss,
  defaultData,
}: CategoryModalProps) => {
  const [step, setStep] = useState(0);
  const { mutate, isPending } = useUpdateVideo(defaultData?.course_id);
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (defaultData) {
      reset({
        title: defaultData.title,
        description: defaultData?.description,
        is_preview: defaultData?.is_preview,
        position: defaultData?.position,
      });
    }
  }, [defaultData]);

  const changeStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const handleCloseModal = () => {
    setStep(0);
    onDismiss();
  };

  const handleCreateVideo = useCallback(
    (data: FieldValues) => {
      mutate(
        { ...data, id: defaultData.id },
        {
          onSuccess: () => {
            toast.success("Uploaded video successfully!");
            reset();
          },
        }
      );
    },
    [defaultData]
  );

  return (
    <Modal transparent onDismiss={handleCloseModal} show={show}>
      {step === 0 && (
        <VideoDetailsUI
          register={register}
          control={control}
          errors={errors}
          type="Edit"
          isPending={isPending}
          onSubmit={handleSubmit(handleCreateVideo)}
          changeStep={changeStep}
          closeModal={handleCloseModal}
        />
      )}
      {step === 1 && (
        <VideoUploader
          closeModal={handleCloseModal}
          courseId={defaultData?.course_id}
          videoId={defaultData?.id}
        />
      )}
    </Modal>
  );
};

const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  position: yup.number(),
  is_preview: yup.boolean(),
});

export default EditVideoModal;
