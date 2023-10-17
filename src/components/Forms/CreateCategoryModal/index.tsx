import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createCategoryModal.module.css";
import clsx from "clsx";
import { Button, Select, TextField } from "@/atoms";
import { AddIcon } from "@/Vectors";
import { Direction } from "@/types";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateCategoryModal = ({ show, onDismiss }: CategoryModalProps) => {
  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <div className={styles.modal}>
        <h2 className=" heading_sm6">Create Category</h2>
        <form className={styles.form}>
          <TextField
            label="Category"
            placeholder="Career Growth"
            direction={Direction.Vertical}
          />
          <Select
            onBlur={() => {}}
            onChange={() => {}}
            name=""
            label="Sub-category"
            options={[]}
            placeholder="Self Development"
            direction={Direction.Vertical}
          />
          <Button>
            <AddIcon /> <span>Create Category</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
