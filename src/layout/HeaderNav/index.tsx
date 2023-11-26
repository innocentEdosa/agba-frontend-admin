import React from "react";
import style from "./headerNav.module.css";
import { TextField } from "@/atoms";
import SearchIcon from "@/Vectors/search";
import clsx from "clsx";
import useUser from "@/hooks/useUser";
import { UserRoleMap } from "@/constants/user";

const HeaderNav = () => {
  const { profile, loadingProfile } = useUser();
  return (
    <div className={clsx("container", style.navHeader)}>
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

      <div className={style.inputWrapper}>
        <TextField startIcon={<SearchIcon />} />
      </div>
    </div>
  );
};

export default HeaderNav;
