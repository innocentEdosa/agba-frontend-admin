import React from "react";
import styles from "./courseVideos.module.css";
import { VideoListItem } from "@/components";

const CourseVideos = () => {
  return (
    <div className={styles.wrapper}>
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
    </div>
  );
};

export default CourseVideos;
