import React from "react";
import OverviewCard from "./OverviewCard";
import styles from "./dashboardOverview.module.css";
import clsx from "clsx";
import Skeleton from "@/atoms/Skeleton";
import { useGetUsersCount } from "@/api/hooks/queries/user";
import { useGetAuthorsCount } from "@/api/hooks/queries/authors";

const DashboardOverview = () => {
  const { data: usersCount, isLoading: isUsersCountLoading } =
    useGetUsersCount();
  const { data: authorsCount, isLoading: isAuthorsCountLoading } =
    useGetAuthorsCount();

  return (
    <div className={clsx("container", styles.overview)}>
      <h2 className="heading_sm4">Overview</h2>
      <div className={styles.overviewCards}>
        {isUsersCountLoading ? (
          <CardSkeleton />
        ) : (
          <OverviewCard title="Total Users" value={usersCount?.count || 0} />
        )}
        {isAuthorsCountLoading ? (
          <CardSkeleton />
        ) : (
          <OverviewCard
            title="Total Authors"
            value={authorsCount?.count || 0}
          />
        )}
        <OverviewCard title="Daily Visitors" value={0} />
        <OverviewCard title="Online Learners" value={0} />
      </div>
    </div>
  );
};

export default DashboardOverview;

const CardSkeleton = () => (
  <Skeleton style={{ width: "100%", height: "11rem" }} />
);
