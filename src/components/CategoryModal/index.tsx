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
import {
  useArchiveCategories,
  useDeleteCategories,
} from "@/api/hooks/mutations/categories";
import NotificationCard from "@/atoms/NotificationCard";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import qs from "qs";
import { CategoryStatus } from "@/constants/category";
import { filterOptions } from "@/constants/filterMappers";


const initialFilter = [
  {
    key: "status",
    value: CategoryStatus.ACTIVE,
    condition: filterOptions.EQUAL,
  },
];

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
  const [showDeleteModal, setShowdeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
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
  const { data: categoriesData } = useGetCategories({
    page: 1,
    limit: 100,
    filter: qs.stringify([...initialFilter]),
  });
  const { mutate: deleteCategories, isPending: isDeletingcategories } =
    useDeleteCategories();
  const { mutate: archiveCategories, isPending: isArchivingcategories } =
    useArchiveCategories();

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

  const handleDeleteCategories = (type: "category" | "sub-category") => {
    const params =
      type === "category" ? selectedCategories : selectedSubCategories;
    deleteCategories(params, {
      onSuccess() {
        type === "category"
          ? setSelectedCategories([])
          : setSelectedSubCategories([]);
        toast.success("deleted successfully");
        setShowdeleteModal(false);
      },
      onError() {
        toast.error("An error occured while deleting");
      },
    });
  };

  const handleArchiveCategories = (type: "category" | "sub-category") => {
    const params =
      type === "category" ? selectedCategories : selectedSubCategories;
    archiveCategories(params, {
      onSuccess() {
        type === "category"
          ? setSelectedCategories([])
          : setSelectedSubCategories([]);
        toast.success("Archived successfully");
        setShowArchiveModal(false);
      },
      onError() {
        toast.error("An error occured");
      },
    });
  };

  return (
    <>
      <Modal transparent onDismiss={closeCategoriesModal} show={show}>
        <div className={style.modal}>
          <h2 className=" heading_sm6">Course Categories</h2>
          <div className={clsx(style.btnGroup, style.categoryBtnGroup)}>
            <Button
              disabled={!!!selectedCategories.length}
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              onClick={() => setShowdeleteModal(true)}>
              <TrashIcon size={16} />
              <span>Delete</span>
            </Button>
            <Button
              onClick={() => setShowArchiveModal(true)}
              disabled={!!!selectedCategories.length}
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Secondary}>
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
                <Button
                  onClick={() => setShowdeleteModal(true)}
                  disabled={!!!selectedSubCategories.length}
                  genre={ButtonGenre.Text}
                  variant={ButtonVariant.Danger}>
                  <TrashIcon size={12} />
                  <span>Delete</span>
                </Button>
                <Button
                  onClick={() => setShowArchiveModal(true)}
                  disabled={!!!selectedSubCategories.length}
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
      <ConfirmationModal
        show={!!showDeleteModal}
        title="Delete Category"
        message="Are you sure you want to delete this Category? This action can not be reversed. If you don't want the category to be visible, you can archive it instead"
        cancelAction={() => setShowdeleteModal(false)}
        confirmationAction={() =>
          handleDeleteCategories(
            !!selectedSubCategories.length ? "sub-category" : "category"
          )
        }
        isActionProcessing={false}
      />
      <ConfirmationModal
        show={!!showArchiveModal}
        title="Archive Category"
        message="Are you sure you want to archive this Category? Once archived, this course will no longer be visible"
        cancelAction={() => setShowArchiveModal(false)}
        confirmationAction={() =>
          handleArchiveCategories(
            !!selectedSubCategories.length ? "sub-category" : "category"
          )
        }
        confirmationText="Yes, i want to archive it"
        actionBtnVariant={ButtonVariant.Secondary}
        isActionProcessing={false}
        showIcon={false}
      />
    </>
  );
};

export default CategoryModal;
