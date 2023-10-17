import React from "react";
import styles from "./avatar.module.css";

export type AvatarProps = {
  src: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Avatar = ({ src, ...props }: AvatarProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt="" {...props} className={styles.image} />
    </div>
  );
};

export default Avatar;
