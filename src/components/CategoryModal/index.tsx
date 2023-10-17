import React, { useMemo } from "react";
import Modal from "@/atoms/Modal";
import style from "./categoryModal.module.css";
import Checkbox from "@/atoms/checkbox";
import { Button } from "@/atoms";
import {
  AddIcon,
  ChevronRight,
  CloseIcon,
  DirectBoxReceiptIcon,
  Edit2Icom,
  TrashIcon,
} from "@/Vectors";
import clsx from "clsx";
import { usePopper } from "react-popper";
import { ButtonGenre, ButtonVariant } from "@/types";

export type CategoryModalProps = {
  show: boolean;
  onDismiss: () => void;
  showCreateCategory: () => void;
};

export type Category = {
  id: string;
  name: string;
  subCategories: Category[] | null;
};

const categories: Category[] = [
  {
    name: "Business and Enterpreneurship",
    id: "1",
    subCategories: [{ name: "hello world", id: "4", subCategories: null }],
  },
  {
    name: "hello world 3",
    id: "34",
    subCategories: [{ name: "yes bro", id: "5", subCategories: null }],
  },
  {
    name: "third category",
    id: "8rfh",
    subCategories: [],
  },
];

const CategoryModal = ({
  show,
  onDismiss,
  showCreateCategory,
}: CategoryModalProps) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
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

  const displaySubCategories = useMemo(() => {
    const selectedCateoory = categories.find(
      (category) => category.id === showSubCategories
    );
    return selectedCateoory?.subCategories;
  }, [showSubCategories, categories]);

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

  return (
    <Modal transparent onDismiss={closeCategoriesModal} show={show}>
      <div className={style.modal}>
        <h2 className=" heading_sm6">Course Categories</h2>
        <div className={clsx(style.btnGroup, style.categoryBtnGroup)}>
          <Button genre={ButtonGenre.Text} variant={ButtonVariant.Danger}>
            <TrashIcon height={16} />
            <span>Delete</span>
          </Button>
          <Button genre={ButtonGenre.Text} variant={ButtonVariant.Secondary}>
            <DirectBoxReceiptIcon />
            <span>Archive</span>
          </Button>
          <Button genre={ButtonGenre.Text} variant={ButtonVariant.Neutral}>
            <Edit2Icom height={16} />
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
                showSubCategories === category?.id ? setReferenceElement : null
              }>
              <Checkbox label={category.name} />
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
            <AddIcon />
          </span>
          <span> Add another category</span>
        </Button>
      </div>
      <>
        {!!displaySubCategories && (
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
                <TrashIcon height={16} />
                <span>Delete</span>
              </Button>
              <Button
                genre={ButtonGenre.Text}
                variant={ButtonVariant.Secondary}>
                <DirectBoxReceiptIcon />
                <span>Archive</span>
              </Button>
              <Button genre={ButtonGenre.Text} variant={ButtonVariant.Neutral}>
                <Edit2Icom height={16} />
                <span>Edit</span>
              </Button>
            </div>
            {!!!displaySubCategories.length && <span>No sub Categories</span>}
            {displaySubCategories.map((category) => (
              <div className={style.category} key={category.id}>
                <Checkbox label={category.name} />
              </div>
            ))}
          </div>
        )}
      </>
    </Modal>
  );
};

export default CategoryModal;
