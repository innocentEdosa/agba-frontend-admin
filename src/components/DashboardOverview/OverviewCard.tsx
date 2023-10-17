import React from "react";
import styles from "./dashboardOverview.module.css";
import clsx from "clsx";

export type OverviewCardProps = {
  title: string;
  value: number | string;
  primary?: boolean;
};

const OverviewCard = ({ title, value, primary }: OverviewCardProps) => {
  return (
    <div className={styles.overviewCard} data-primary={primary}>
      <span className={styles.overviewCardTitle}>
        {title}
      </span>
      <span className={clsx("heading_lg4",styles.overviewCardValue)}>{value}</span>
    </div>
  );
};

export default OverviewCard;
