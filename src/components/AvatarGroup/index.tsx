import React from "react";
import Avatar from "@/atoms/Avatar";
import { Avatar as AvatarType } from "@/types";
import styles from "./avatarGroup.module.css";

type AvatarGroupProps = {
  avatars: AvatarType[];
  maxDisplay: number;
};

const AvatarGroup = ({ avatars, maxDisplay }: AvatarGroupProps) => {
  const avatarsToDisplay = [...avatars].slice(0, maxDisplay);
  const avatarsToHide = [...avatars].slice(maxDisplay);

  return (
    <div className={styles.wrapper}>
      {avatarsToDisplay.map((avatar, index) => (
        <Avatar key={avatar?.id} src={avatar?.cloudinary_url} />
      ))}
      {!!avatarsToHide.length && (
        <div className={styles.avatarsRemainingCount}>
          +{avatarsToHide.length}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
