import React from "react";
import OverviewCard from "./OverviewCard";
import styles from "./dashboardOverview.module.css";
import clsx from "clsx";

type OverviewProps = {
  usersCount: number;
  authorsCount: number;
  dailyVisitors: number;
  onlineLearners: number;
};

const DashboardOverview = ({
  usersCount = 0,
  authorsCount = 0,
  dailyVisitors = 0,
  onlineLearners = 0,
}: OverviewProps) => {
  return (
    <div className={clsx("container", styles.overview)}>
      <h2 className="heading_sm4">Overview</h2>
      <div className={styles.overviewCards}>
        <OverviewCard title="Total Learners" value={usersCount} primary />
        <OverviewCard title="Total Authorss" value={authorsCount} />
        <OverviewCard title="Daily Visitors" value={dailyVisitors} />
        <OverviewCard title="Online Learners" value={onlineLearners} />
      </div>
    </div>
  );
};

export default DashboardOverview;
