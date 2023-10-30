import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createCategoryModal.module.css";
import { Button, Select, TextField } from "@/atoms";
import { AddIcon, LoaderIcon } from "@/Vectors";
import { CategoryType, CreateCategoryParam, Direction } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetCategories } from "@/api/hooks/queries/categories";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  defaultValues?: CreateCategoryParam;
  type: "Edit" | "Create";
  action: (data: CreateCategoryParam, cb?: () => void) => void;
  isPending: boolean;
};

const CreateCategoryModal = ({
  show,
  onDismiss,
  type,
  defaultValues = {} as CreateCategoryParam,
  action,
  isPending,
}: CategoryModalProps) => {
  const { data: categoriesData } = useGetCategories({});

  const categoriesOption = useMemo(() => {
    if (!categoriesData?.top_category) return [];
    return categoriesData.top_category.map((category: CategoryType) => {
      const label = category?.title;
      const value = category?.id;
      return { label, value };
    });
  }, [categoriesData]);
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    action(data, reset);
  });
  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <div className={styles.modal}>
        <h2 className=" heading_sm6">{type} Category</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <TextField
            label="Category"
            placeholder="Career Growth"
            direction={Direction.Vertical}
            {...register("title")}
            error={errors.title?.message}
          />
          <Select
            label="Sub-category"
            options={categoriesOption}
            placeholder="Self Development"
            direction={Direction.Vertical}
            {...register("parent_id")}
            // @ts-ignore
            control={control}
            name="parent_id"
          />
          <Button>
            {!isPending ? (
              <>
                <AddIcon /> <span>Create Category</span>
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

export default CreateCategoryModal;

const schema = yup.object().shape({
  title: yup.string().required(),
  parent_id: yup.string(),
});
