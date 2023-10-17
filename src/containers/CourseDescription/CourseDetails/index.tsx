import {
  ChevronRight,
  DirectBoxReceiptIcon,
  Edit2Icom,
  TrashIcon,
} from "@/Vectors";
import clsx from "clsx";
import React from "react";
import styles from "./courseDetails.module.css";
import Avatar from "@/atoms/Avatar";
import { Review } from "@/components";
import Link from "next/link";
import { Button } from "@/atoms";
import { ButtonGenre, ButtonVariant } from "@/types";

const reviews = Array.from({ length: 4 }).map((_, index) => ({
  user: { email: "user@example.com", fullName: "Jack Robbinson" },
  content: `“Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est”`,
  rating: 0,
}));

const CourseDetails = () => {
  return (
    <div>
      <div className={clsx(styles.section, styles.titleSection)}>
        <div className={styles.titleWrapper}>
          <span className={styles.sectionTitle}>Title</span>
          <h2 className={styles.courseTitle}>course title</h2>
        </div>
        <div className={clsx(styles.btnGroup, styles.categoryBtnGroup)}>
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
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Course Image</span>
        <img
          className={styles.courseImage}
          src="https://picsum.photos/200/100"
          alt=""
        />
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Description</span>
        <p className={styles.sectionText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis,
          amet adipisci ducimus dolorum nam quasi iusto reprehenderit delectus.
          Mollitia, totam facere amet cum nulla doloremque soluta ipsa beatae
          earum esse quam praesentium deserunt dolorum perferendis libero eum ab
          quaerat tempore sint voluptatibus voluptatem. Laboriosam repudiandae
          sequi, sapiente asperiores quos delectus ullam quod ipsum animi
          corporis aspernatur? Voluptatum porro consequatur magni sapiente id
          eligendi! Facere quaerat aliquid fuga deleniti iusto fugiat a, iure ab
          laboriosam eum modi nobis, provident rerum ipsum, cumque esse nemo
          reiciendis illum consequuntur! Dolorem, consequatur ad unde placeat
          iusto illo, ex nesciunt minus ea est quam ipsam.
        </p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Short Description</span>
        <p className={styles.sectionText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis,
          amet adipisci ducimus dolorum nam quasi iusto reprehenderit delectus.
        </p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Rating</span>
        <p className={styles.sectionText}>4.6</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Price</span>
        <p className={styles.sectionText}>6,500</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Category</span>
        <p className={styles.sectionText}>Career growth</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Sub Category</span>
        <p className={styles.sectionText}>Personal development</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Featured</span>
        <span className={styles.badge} data-variant={"primary"}>
          yes
        </span>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Created</span>
        <p className={styles.sectionText}>21/7/2023</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Author</span>
        <div className={styles.authorDetails}>
          <Avatar src="https://picsum.photos/50" />
          <span className={styles.sectionTextDark}>Wisdom Chuks</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Coming Soon</span>
        <p className={styles.badge} data-variant={"danger"}>
          No
        </p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Featured Position</span>
        <p className={styles.sectionTextDark}>2</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>No of Enrolled Students</span>
        <p className={styles.sectionTextDark}>1,200</p>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Course Reviews</span>
        <div className={styles.reviewsWrapper}>
          <div className={styles.reviews}>
            {reviews.map((review, index) => (
              <Review
                key={review.user.email + index}
                user={review.user}
                content={review.content}
                rating={review.rating}
              />
            ))}
          </div>
          <div className={styles.link}>
            <Link href={`/courses/hello-world/reviews`}>View all reviews</Link>
            <span>
              <ChevronRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
