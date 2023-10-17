import React from "react";
import CourseReview from "@/containers/CourseReview";

const Page = ({ params }: { params: { slug: string } }) => {
  return <CourseReview />;
};

export default Page;
