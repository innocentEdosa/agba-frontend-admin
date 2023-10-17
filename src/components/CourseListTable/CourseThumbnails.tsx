import React from "react";
import styles from "./courselist.module.css";

const CourseThumbnails = ({
  thumbnails = [],
  displayedThumbnails,
}: {
  thumbnails: string[];
  displayedThumbnails: number;
}) => {
  const thumbnailsToDisplay = [...thumbnails].slice(0, displayedThumbnails);
  const thumbnailsToHide = [...thumbnails].slice(displayedThumbnails);
  return (
    <div className={styles.thumbnailsWrapper}>
      {thumbnailsToDisplay.map((thumbnail, index) => (
        <img key={thumbnail + index} className={styles.thumbnail} src={thumbnail} />
      ))}
      {!!thumbnailsToHide.length && (
        <div className={styles.thumbnailRemainingCount}>
          +{thumbnailsToHide.length}
        </div>
      )}
    </div>
  );
};

export default CourseThumbnails;
