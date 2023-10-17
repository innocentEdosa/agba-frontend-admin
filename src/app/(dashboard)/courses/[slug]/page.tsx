import React from "react";
import CourseDescription from "@/containers/CourseDescription";

const Page = ({ params }: { params: { slug: string } }) => {
  return <CourseDescription />;
};

export default Page;
