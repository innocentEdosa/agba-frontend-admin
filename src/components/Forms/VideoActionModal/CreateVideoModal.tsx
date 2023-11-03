import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/atoms/Modal";
import VideoDetailsUI from "./VideoDetailsUi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import VideoUploader from "./VideoUploadUI";
import { CreateVideoDetailsParams } from "@/types";
import { toast } from "react-toastify";
import { useCreateVideo } from "@/api/hooks/mutations/video";

export type CategoryModalProps = {
  courseId: string;
  show: boolean;
  onDismiss: () => void;
};

const CreateVideoModal = ({
  courseId,
  show,
  onDismiss,
}: CategoryModalProps) => {
  const [step, setStep] = useState(0);
  const { mutate, isPending } = useCreateVideo(courseId);
  const [videoId, setVideoid] = useState("");
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const changeStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const handleCloseModal = () => {
    setStep(0);
    onDismiss();
  };

  const handleCreateVideo = useCallback(
    (data: FieldValues) => {
      const params = { ...data, course_id: courseId };
      mutate(params as CreateVideoDetailsParams, {
        onSuccess(data) {
          setVideoid(data.id);
          reset();
          toast.success("Course Created Successfully");
          setStep(1);
        },
      });
    },
    [courseId]
  );

  return (
    <Modal transparent onDismiss={handleCloseModal} show={show}>
      {step === 0 && (
        <VideoDetailsUI
          register={register}
          control={control}
          errors={errors}
          type="Create"
          isPending={isPending}
          onSubmit={handleSubmit(handleCreateVideo)}
          changeStep={changeStep}
          closeModal={handleCloseModal}
        />
      )}
      {step === 1 && (
        <VideoUploader
          closeModal={handleCloseModal}
          courseId={courseId}
          videoId={videoId}
        />
      )}
    </Modal>
  );
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  position: yup.number().required(),
  is_preview: yup.boolean().required(),
});

export default CreateVideoModal;
