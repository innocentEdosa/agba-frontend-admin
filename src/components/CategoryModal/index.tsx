import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/atoms/Modal";
import style from "./categoryModal.module.css";
import Checkbox from "@/atoms/Inputs/checkbox";
import { Button } from "@/atoms";
import {
  AddIcon,
  ChevronRight,
  CloseIcon,
  DirectBoxReceiptIcon,
  Edit2Icon,
  TrashIcon,
} from "@/Vectors";
import clsx from "clsx";
import { usePopper } from "react-popper";
import { ButtonGenre, ButtonVariant } from "@/types";
import { useGetCategories } from "@/api/hooks/queries/categories";
import CreateCategoryModal from "../Forms/CreateCategoryModal";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  showCreateCategory: () => void;
};

const CategoryModal = ({
  show,
  onDismiss,
  showCreateCategory,
}: CategoryModalProps) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 25],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["left", "bottom", "right"],
        },
      },
    ],
  });
  const [showSubCategories, setShowSubCategories] = React.useState("");
  const { data: categoriesData } = useGetCategories({});

  const categories = useMemo(() => {
    if (!categoriesData?.top_category) return [];
    return categoriesData.top_category;
  }, [categoriesData]);

  const displaySubCategories = useMemo(() => {
    const selectedCateoory = categories.find(
      (category) => category.id === showSubCategories
    );
    if (!selectedCateoory) return [];
    return (categoriesData && categoriesData[selectedCateoory.title]) || [];
  }, [showSubCategories, categories, categoriesData]);

  const closeSubcategoriesModal = () => {
    setShowSubCategories("");
  };

  const closeCategoriesModal = () => {
    closeSubcategoriesModal();
    onDismiss();
  };

  const handleShowAddCategory = () => {
    showCreateCategory();
    closeCategoriesModal();
  };

  const handleSelectCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked && !selectedCategories.includes(id)) {
      setSelectedCategories((prev) => [...prev, id]);
    }
    if (!e.target.checked && selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((ids) => ids !== id));
    }
  };

  return (
    <>
      <Modal transparent onDismiss={closeCategoriesModal} show={show}>
        <div className={style.modal}>
          <h2 className=" heading_sm6">Course Categories</h2>
          <div className={clsx(style.btnGroup, style.categoryBtnGroup)}>
            <Button genre={ButtonGenre.Text} variant={ButtonVariant.Danger}>
              <TrashIcon size={16} />
              <span>Delete</span>
            </Button>
            <Button genre={ButtonGenre.Text} variant={ButtonVariant.Secondary}>
              <DirectBoxReceiptIcon size={16} />
              <span>Archive</span>
            </Button>
            <Button genre={ButtonGenre.Text} variant={ButtonVariant.Neutral}>
              <Edit2Icon size={16} />
              <span>Edit</span>
            </Button>
          </div>
          <div className={style.categories}>
            {!!!categories.length && <span>No categories created</span>}
            {categories.map((category) => (
              <div
                className={style.category}
                key={category.id}
                data-selected={showSubCategories === category.id}
                // @ts-ignore
                ref={
                  showSubCategories === category?.id
                    ? setReferenceElement
                    : null
                }>
                <Checkbox
                  onChange={(e) => {
                    handleSelectCategory(e, category.id);
                  }}
                  label={category.title}
                />
                <button onClick={() => setShowSubCategories(category.id)}>
                  <ChevronRight />
                </button>
              </div>
            ))}
          </div>
          <Button
            className={style.addCategoryBtn}
            variant={ButtonVariant.Primary}
            genre={ButtonGenre.Text}
            onClick={handleShowAddCategory}>
            <span>
              <AddIcon size={60} />
            </span>
            <span> Add another category</span>
          </Button>
        </div>
        <>
          {!!displaySubCategories && !!showSubCategories && (
            <div
              className={style.subCategoriesModal}
              style={styles.popper}
              {...attributes.popper}
              // @ts-ignore
              ref={setPopperElement}>
              <div className={style.titleWrapper}>
                <h3>Sub-categories</h3>
                <button
                  className={style.closeSubCategoriesBtn}
                  onClick={closeSubcategoriesModal}>
                  <CloseIcon />
                </button>
              </div>
              <div className={clsx(style.btnGroup, style.subCategoryBtnGroup)}>
                <Button genre={ButtonGenre.Text} variant={ButtonVariant.Danger}>
                  <TrashIcon size={12} />
                  <span>Delete</span>
                </Button>
                <Button
                  genre={ButtonGenre.Text}
                  variant={ButtonVariant.Secondary}>
                  <DirectBoxReceiptIcon size={12} />
                  <span>Archive</span>
                </Button>
                <Button
                  genre={ButtonGenre.Text}
                  variant={ButtonVariant.Neutral}>
                  <Edit2Icon size={12} />
                  <span>Edit</span>
                </Button>
              </div>
              {!!!displaySubCategories.length && <span>No sub Categories</span>}
              {displaySubCategories.map((category) => (
                <div className={style.category} key={category.id}>
                  <Checkbox label={category.title} />
                </div>
              ))}
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default CategoryModal;
