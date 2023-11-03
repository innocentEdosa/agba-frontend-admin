import React, { useMemo } from "react";
import styles from "./courseVideos.module.css";
import { VideoListItem } from "@/components";
import { useGetCourseVideos } from "@/api/hooks/queries/video";

type CourseVideoType = {
  courseId?: string;
};

const CourseVideos = ({ courseId }: CourseVideoType) => {
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 4,
  });
  const { data: courseVideoResponse, isLoading } = useGetCourseVideos({
    id: courseId!,
    ...paginationState,
  });

  const videos = useMemo(() => {
    if (!courseVideoResponse) return [];
    return courseVideoResponse.data;
  }, [courseVideoResponse]);
  return (
    <div className={styles.wrapper}>
      {!!videos.length &&
        videos.map((video) => <VideoListItem key={video.id} video={video} />)}
    </div>
  );
};

export default CourseVideos;
