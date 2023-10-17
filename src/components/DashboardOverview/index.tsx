import React from "react";
import OverviewCard from "./OverviewCard";
import styles from "./dashboardOverview.module.css";
import clsx from "clsx";

const DashboardOverview = () => {
  return (
    <div className={clsx("container",styles.overview)}>
      <h2 className="heading_sm4">Overview</h2>
      <div className={styles.overviewCards}>
        <OverviewCard title="Total Learners" value="14,000" primary />
        <OverviewCard title="Total Authorss" value={100} />
        <OverviewCard title="Daily Visitors" value={100} />
        <OverviewCard title="Online Learners" value={100} />
      </div>
    </div>
  );
};

export default DashboardOverview;
