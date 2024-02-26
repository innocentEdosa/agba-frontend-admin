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
import { ButtonGenre, ButtonVariant, Video } from "@/types";
import clsx from "clsx";
import Review from "../Review";
import Link from "next/link";
import { formatDuration } from "@/utils/formatDuration";
import moment from "moment";
import EditVideoModal from "../Forms/VideoActionModal/EditVideoModal";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useArchiveVideo, useDeleteVideo } from "@/api/hooks/mutations/video";

const reviews = Array.from({ length: 2 }).map((_, index) => ({
  user: { email: "user@example.com", fullName: "Jack Robbinson" },
  content: `“Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est”`,
  rating: 0,
}));

type VideoListItemProps = {
  video: Video;
};

const VideoListItem = ({ video }: VideoListItemProps) => {
  const [showEditVideoModal, setShowEditVideoModal] = useState(false);
  const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
  const [showArchiveVideoModal, setShowArchiveVideoModal] = useState(false);
  const deleteVideoMutation = useDeleteVideo(video.course_id);
  const archiveVideoMutation = useArchiveVideo(video.course_id);

  const router = useRouter();

  const handleDeleteVideo = async () => {
    await deleteVideoMutation.mutateAsync(video.id, {
      onSuccess: () => {
        toast.success("Video deleted successfully");
        setShowDeleteVideoModal(false);
      },
      onError: () => {
        toast.error("An error occured while deleting this author");
      },
    });
  };

  const handleArchiveVideo = async () => {
    await archiveVideoMutation.mutateAsync(video.id, {
      onSuccess: () => {
        toast.success("Video was archived successfully");
        setShowArchiveVideoModal(false);
      },
      onError: () => {
        toast.error("An error occured while archiving this video");
      },
    });
  };

  return (
    <div>
      <article className={styles.wrapper}>
        <VideoPlayer src={video.url} />

        <div className={clsx(styles.btnGroup)}>
          <Button
            onClick={() => setShowDeleteVideoModal(true)}
            genre={ButtonGenre.Text}
            variant={ButtonVariant.Danger}>
            <TrashIcon size={16} />
            <span>Delete</span>
          </Button>
          <Button
            onClick={() => setShowArchiveVideoModal(true)}
            genre={ButtonGenre.Text}
            variant={ButtonVariant.Secondary}>
            <DirectBoxReceiptIcon height={16} width={16} />
            <span>Archive</span>
          </Button>
          <Button
            genre={ButtonGenre.Text}
            variant={ButtonVariant.Neutral}
            onClick={() => setShowEditVideoModal(true)}>
            <Edit2Icon height={16} width={16} />
            <span>Edit</span>
          </Button>
        </div>

        <div className={styles.details}>
          <div>
            <span className={styles.heading}>Title</span>
            <p className={styles.text}>{video.title}</p>
          </div>
          <div>
            <span className={styles.heading}>Description</span>
            <p className={styles.text}>{video?.description || "-"}</p>
          </div>
          <div>
            <span className={styles.heading}>Duration</span>
            <p className={styles.text}>
              {video?.duration ? formatDuration(video.duration) : "-"}
            </p>
          </div>
          <div>
            <span className={styles.heading}>Created</span>
            <p className={styles.text}>
              {moment(video.created_at).format("DD/MM/YYYY")}
            </p>
          </div>
          {/* <div>
            <span className={styles.heading}>Author</span>
            <p className={styles.text}>Wisdom chuks</p>
          </div> */}
          <div>
            <span className={styles.heading}>Position</span>
            <p className={styles.text}>{video.position}</p>
          </div>
        </div>

        {/* <div className={styles.reviewSection}>
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
              <Link href={`/courses/hello-world/reviews`}>
                View all reviews
              </Link>
              <span>
                <ChevronRight />
              </span>
            </div>
          </div>
        </div> */}
      </article>
      <EditVideoModal
        show={showEditVideoModal}
        onDismiss={() => setShowEditVideoModal(false)}
        defaultData={video}
      />
      <ConfirmationModal
        show={showDeleteVideoModal}
        title="Delete Video"
        message="Are you sure you want to delete this Video? This action can not be reversed, If you don't want this video to be visible to users, then archive the video instead"
        cancelAction={() => setShowDeleteVideoModal(false)}
        isActionProcessing={deleteVideoMutation.isPending}
        confirmationAction={handleDeleteVideo}
      />
      <ConfirmationModal
        show={showArchiveVideoModal}
        title="Archive Video"
        message="Are you sure you want to archive this Video? Once archived, this video will no longer be available to the public unless this action is reversed"
        cancelAction={() => setShowArchiveVideoModal(false)}
        confirmationAction={handleArchiveVideo}
        confirmationText="Yes, i want to archive it"
        actionBtnVariant={ButtonVariant.Secondary}
        isActionProcessing={archiveVideoMutation.isPending}
        showIcon={false}
      />
    </div>
  );
};

export default VideoListItem;
