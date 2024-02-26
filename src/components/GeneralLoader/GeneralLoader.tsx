import Spinner from "@/atoms/Spinner.tsx";
import React from "react";

const GeneralLoader = ({ style = {} }: { style?: React.CSSProperties }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxHeight: "100%",
        width: "100%",
        ...style,
      }}>
      <Spinner />
    </div>
  );
};

export default GeneralLoader;
