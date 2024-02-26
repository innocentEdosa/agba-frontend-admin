import {
  ChevronRight,
  DirectBoxReceiptIcon,
  Edit2Icon,
  TrashIcon,
} from "@/Vectors";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./courseDetails.module.css";
import Avatar from "@/atoms/Avatar";
import { EditCourseModal, Review } from "@/components";
import Link from "next/link";
import { Button } from "@/atoms";
import { ButtonGenre, ButtonVariant, Course } from "@/types";
import moment from "moment";
import InsertHtml from "@/atoms/RichTextRenderer";
import GeneralLoader from "@/components/GeneralLoader/GeneralLoader";

const reviews = Array.from({ length: 4 }).map((_, index) => ({
  user: { email: "user@example.com", fullName: "Jack Robbinson" },
  content: `“Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est”`,
  rating: 0,
}));

export type CourseDetailsParams = {
  course?: Course;
  isCourseLoading: boolean;
};

const CourseDetails = ({ course, isCourseLoading }: CourseDetailsParams) => {
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const Author = course?.authors[0];

  if (isCourseLoading) {
    return <GeneralLoader style={{ height: "20rem" }} />;
  }

  return (
    <>
      <div>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Title</span>
          <div className={styles.titleBtnGroupWrapper}>
            <h2 className={styles.courseTitle}>{course?.title}</h2>
            <div className={clsx(styles.btnGroup, styles.categoryBtnGroup)}>
              <Button genre={ButtonGenre.Text} variant={ButtonVariant.Danger}>
                <TrashIcon size={16} />
                <span>Delete</span>
              </Button>
              <Button
                genre={ButtonGenre.Text}
                variant={ButtonVariant.Secondary}>
                <DirectBoxReceiptIcon size={16} />
                <span>Archive</span>
              </Button>
              <Button
                genre={ButtonGenre.Text}
                variant={ButtonVariant.Neutral}
                onClick={() => setShowEditCourseModal(true)}>
                <Edit2Icon size={16} />
                <span>Edit</span>
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Course Image</span>
          <img
            className={styles.courseImage}
            src={course?.avatar?.cloudinary_url || course?.avatar?.aws_url}
            alt=""
          />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Description</span>
          {!!course?.description && <InsertHtml html={course.description} />}
          {!!!course?.description && <p className={styles.sectionText}></p>}
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Short Description</span>
          <p className={styles.sectionText}>
            {course?.short_description || "No short description"}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Rating</span>
          <p className={styles.sectionText}>{course?.rating || "-"}</p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Price</span>
          <p className={styles.sectionText}>{course?.price_value}</p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Category</span>
          <p className={styles.sectionText}>
            {course?.category?.title || "UnCategorized"}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Sub Category</span>
          <p className={styles.sectionText}>
            {course?.sub_category?.title || "No Sub Category"}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Featured</span>
          <span
            className={styles.badge}
            data-variant={course?.is_featured ? "primary" : "danger"}>
            {course?.is_featured ? "Yes" : "No"}
          </span>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Created</span>
          <p className={styles.sectionText}>
            {moment(course?.created_at!).format("DD/MM/YYYY")}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Author</span>
          <div className={styles.authorDetails}>
            <Avatar src={course?.authors[0]?.avatar?.cloudinary_url || ""} />
            <span className={styles.sectionTextDark}>
              {`${Author?.first_name} ${Author?.last_name}` || "No Author Name"}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Coming Soon</span>
          <p
            className={styles.badge}
            data-variant={course?.is_coming ? "primary" : "danger"}>
            {course?.is_coming ? "Yes" : "No"}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Featured Position</span>
          <p className={styles.sectionTextDark}>
            {course?.featured_position || "N/A"}
          </p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>No of Enrolled Students</span>
          <p className={styles.sectionTextDark}>
            {course?.total_enrollments || "0"}
          </p>
        </div>

        <div className={clsx(styles.section, styles.reviewSection)}>
          <span className={styles.sectionTitle}>Course Reviews</span>
          <div className={styles.reviewsWrapper}>
            {!course?.reviews?.length && (
              <p className={styles.sectionText}>No reviews</p>
            )}
            {!!course?.reviews?.length && (
              <>
                <div className={styles.reviews}>
                  {course?.reviews?.map((review, index) => (
                    <Review key={review?.id} {...review} />
                  ))}
                </div>
                {course?.reviews?.length! > 4 && (
                  <div className={styles.link}>
                    <Link href={`/courses/hello-world/reviews`}>
                      View all reviews
                    </Link>
                    <span>
                      <ChevronRight />
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <EditCourseModal
        show={showEditCourseModal}
        onDismiss={() => setShowEditCourseModal(false)}
        initialData={course!}
      />
    </>
  );
};

export default CourseDetails;
