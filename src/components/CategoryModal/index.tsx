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
import { ButtonGenre, ButtonVariant, CategoryType } from "@/types";
import { useGetCategories } from "@/api/hooks/queries/categories";
import { useDeleteCategories } from "@/api/hooks/mutations/categories";
import NotificationCard from "@/atoms/NotificationCard";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  showCreateCategory: () => void;
  onEditCategory: (category: CategoryType) => void;
};

const CategoryModal = ({
  show,
  onDismiss,
  showCreateCategory,
  onEditCategory,
}: CategoryModalProps) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
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
  const [error, setError] = useState("");
  const { data: categoriesData } = useGetCategories({});
  const { mutate: deleteCategories, isPending: idDeletingcategories } =
    useDeleteCategories();

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
    setSelectedCategories([]);
    setError("");
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
    setError("");
    if (e.target.checked && !selectedCategories.includes(id)) {
      setSelectedCategories((prev) => [...prev, id]);
    }
    if (!e.target.checked && selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((ids) => ids !== id));
    }
  };

  const handleEditCategory = () => {
    if (selectedCategories.length > 1) {
      return setError("You can only edit one category at a time");
    }
    if (!selectedCategories.length) {
      return setError("Please select a category to edit");
    }
    onEditCategory(
      categories.find((category) => category.id === selectedCategories[0])!
    );
    closeCategoriesModal();
  };

  const handleSelectSubCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setError("");
    if (e.target.checked && !selectedSubCategories.includes(id)) {
      setSelectedSubCategories((prev) => [...prev, id]);
    }
    if (!e.target.checked && selectedSubCategories.includes(id)) {
      setSelectedSubCategories((prev) => prev.filter((ids) => ids !== id));
    }
  };

  const handleEditSubCategory = () => {
    if (selectedSubCategories.length > 1) {
      return setError("You can only edit one category at a time");
    }
    if (!selectedSubCategories.length) {
      return setError("Please select a category to edit");
    }
    onEditCategory(
      displaySubCategories.find(
        (category) => category.id === selectedSubCategories[0]
      )!
    );
    closeCategoriesModal();
  };

  return (
    <>
      <Modal transparent onDismiss={closeCategoriesModal} show={show}>
        <div className={style.modal}>
          <h2 className=" heading_sm6">Course Categories</h2>
          <div className={clsx(style.btnGroup, style.categoryBtnGroup)}>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              onClick={() => deleteCategories(selectedCategories)}>
              <TrashIcon size={16} />
              <span>Delete</span>
            </Button>
            <Button genre={ButtonGenre.Text} variant={ButtonVariant.Secondary}>
              <DirectBoxReceiptIcon size={16} />
              <span>Archive</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Neutral}
              onClick={handleEditCategory}>
              <Edit2Icon size={16} />
              <span>Edit</span>
            </Button>
          </div>
          {error && <NotificationCard content={error} />}
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
                  variant={ButtonVariant.Neutral}
                  onClick={handleEditSubCategory}>
                  <Edit2Icon size={12} />
                  <span>Edit</span>
                </Button>
              </div>
              {!!!displaySubCategories.length && <span>No sub Categories</span>}
              {displaySubCategories.map((category) => (
                <div className={style.category} key={category.id}>
                  <Checkbox
                    onChange={(e) => handleSelectSubCategory(e, category.id)}
                    label={category.title}
                  />
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
