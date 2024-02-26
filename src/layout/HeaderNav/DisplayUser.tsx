import useUser from "@/hooks/useUser";
import React from "react";
import style from "./headerNav.module.css";
import { UserRoleMap } from "@/constants/user";
import Skeleton from "@/atoms/Skeleton";

const DisplayUser = () => {
  const { profile, loadingProfile } = useUser();

  if (loadingProfile) return <DisplayUserSkeleton />;

  return (
    <div className={style.textContent}>
      {profile && (
        <>
          <p className={style.welcomeUser}>
            Welcome, <span>{profile.firstName} 👋🏼</span>
          </p>
          <p className={style.userRole}>
            {UserRoleMap[profile.role as keyof typeof UserRoleMap]}
          </p>
        </>
      )}
    </div>
  );
};

export default DisplayUser;

const DisplayUserSkeleton = () => (
  <div className={style.skeletonWrapper}>
    <Skeleton style={{ width: "400px", height: "20px" }} />
    <Skeleton style={{ width: "150px", height: "12px" }} />
  </div>
);
