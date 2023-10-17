import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import styles from "./createCourseModal.module.css";
import clsx from "clsx";
import { Button, Select, Switch, TextField, Textarea } from "@/atoms";
import { AddIcon } from "@/Vectors";
import { useResponsive } from "@/hooks";
import { Direction } from "@/types";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
};

const CreateCourseModal = ({ show, onDismiss }: CategoryModalProps) => {
  const { isMobile } = useResponsive();

  const direction = isMobile ? Direction.Vertical : Direction.Horizontal;
  return (
    <Modal transparent onDismiss={onDismiss} show={show}>
      <div className={styles.modal}>
        <h2 className=" heading_sm6">Create Course</h2>
        <form className={styles.form}>
          <TextField
            label="Course Title"
            placeholder="E.g How to be a good leader"
            direction={direction}
          />
          <Textarea
            label="Main Description"
            placeholder="Description about the course"
            rows={4}
            direction={direction}
          />
          <Textarea
            label="Short Description"
            placeholder="Short description about the course"
            rows={3}
            direction={direction}
          />
          <TextField label="Price" placeholder="6,500" direction={direction} />
          <Select
            onBlur={() => {}}
            onChange={() => {}}
            name="category"
            label="Category"
            options={[]}
            placeholder="Self Development"
            direction={direction}
          />
          <Select
            onBlur={() => {}}
            onChange={() => {}}
            name="subCategory"
            label="Sub-category"
            options={[]}
            placeholder="Self Development"
            direction={direction}
          />
          <Switch
            label="Featured"
            direction={direction}
            onChange={(e) => console.log(e.target.checked)}
          />
          <Switch label="Coming Soon" direction={direction} />
          <Button>
            <AddIcon /> <span>Create Category</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCourseModal;
