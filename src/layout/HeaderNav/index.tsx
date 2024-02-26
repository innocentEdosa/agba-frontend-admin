import React, { Suspense } from "react";
import style from "./headerNav.module.css";
import { TextField } from "@/atoms";
import SearchIcon from "@/Vectors/search";
import clsx from "clsx";
import useUser from "@/hooks/useUser";
import { UserRoleMap } from "@/constants/user";
import DisplayUser from "./DisplayUser";
import Skeleton from "@/atoms/Skeleton";

const HeaderNav = () => {
  return (
    <div className={clsx("container", style.navHeader)}>
      <DisplayUser />
      <div className={style.inputWrapper}>
        <TextField startIcon={<SearchIcon />} />
      </div>
    </div>
  );
};

export default HeaderNav;
