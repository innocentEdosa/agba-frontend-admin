import React, { useEffect, useRef, useState } from "react";
import styles from "./videoListItem.module.css";
import {
  ChevronRight,
  DirectBoxReceiptIcon,
  Edit2Icon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
} from "@/Vectors";
import useVideoControls from "@/hooks/useVideoControls";
import VideoPlayer from "../Video";
import { Button } from "@/atoms";
import { ButtonGenre, ButtonVariant } from "@/types";
import clsx from "clsx";
import Review from "../Review";
import Link from "next/link";

const reviews = Array.from({ length: 2 }).map((_, index) => ({
  user: { email: "user@example.com", fullName: "Jack Robbinson" },
  content: `“Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est”`,
  rating: 0,
}));

const VideoListItem = () => {
  return (
    <article className={styles.wrapper}>
      <VideoPlayer />
      <div className={clsx(styles.btnGroup)}>
        <Button genre={ButtonGenre.Text} variant={ButtonVariant.Danger}>
          <TrashIcon size={16} />
          <span>Delete</span>
        </Button>
        <Button genre={ButtonGenre.Text} variant={ButtonVariant.Secondary}>
          <DirectBoxReceiptIcon height={16} width={16} />
          <span>Archive</span>
        </Button>
        <Button genre={ButtonGenre.Text} variant={ButtonVariant.Neutral}>
          <Edit2Icon height={16} width={16} />
          <span>Edit</span>
        </Button>
      </div>
      <div className={styles.details}>
        <div>
          <span className={styles.heading}>Title</span>
          <p className={styles.text}>Building Confidence & Low Self Esteem:</p>
        </div>
        <div>
          <span className={styles.heading}>Description</span>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, nisi
            ea quisquam alias error fuga.
          </p>
        </div>
        <div>
          <span className={styles.heading}>Duration</span>
          <p className={styles.text}>90 minutes</p>
        </div>
        <div>
          <span className={styles.heading}>Created</span>
          <p className={styles.text}>23/10/2023</p>
        </div>
        <div>
          <span className={styles.heading}>Author</span>
          <p className={styles.text}>Wisdom chuks</p>
        </div>
        <div>
          <span className={styles.heading}>Position</span>
          <p className={styles.text}>8</p>
        </div>
      </div>
      <div className={styles.reviewSection}>
        <span className={styles.reviewSectionTitle}>Video Reviews</span>
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
    </article>
  );
};

export default VideoListItem;
