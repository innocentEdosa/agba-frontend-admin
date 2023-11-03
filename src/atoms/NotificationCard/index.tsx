import React from "react";
import style from "./notificationcard.module.css";
import { InfoIcon } from "@/Vectors";

type NotificationCardProps = {
  children?: React.ReactNode;
  content?: string;
  variant?: "error" | "info";
};

const NotificationCard = ({
  children,
  content,
  variant = "error",
}: NotificationCardProps) => {
  return (
    <div className={style.wrapper} data-variant={variant}>
      <span>
        <InfoIcon />
      </span>
      <div>{children || content}</div>
    </div>
  );
};

export default NotificationCard;
