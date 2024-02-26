import React, { useMemo } from "react";
import styles from "./courseVideos.module.css";
import { VideoListItem } from "@/components";
import { useGetCourseVideos } from "@/api/hooks/queries/video";
import { filterOptions } from "@/constants/filterMappers";
import { VideoStaus } from "@/constants/video";
import qs from "qs";
import GeneralLoader from "@/components/GeneralLoader/GeneralLoader";

type CourseVideoType = {
  courseId?: string;
};

const initialFilter = [
  {
    key: "status",
    value: VideoStaus.PUBLISHED,
    condition: filterOptions.EQUAL,
  },
];

const CourseVideos = ({ courseId }: CourseVideoType) => {
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 4,
  });
  const { data: courseVideoResponse, isLoading } = useGetCourseVideos({
    id: courseId!,
    ...paginationState,
    filter: qs.stringify([...initialFilter]),
  });

  const videos = useMemo(() => {
    if (!courseVideoResponse) return [];
    return courseVideoResponse.data;
  }, [courseVideoResponse]);

  if (isLoading) {
    return <GeneralLoader style={{ height: "20rem" }} />;
  }

  return (
    <div className={styles.wrapper}>
      {!!videos.length &&
        videos.map((video) => <VideoListItem key={video.id} video={video} />)}
    </div>
  );
};

export default CourseVideos;
