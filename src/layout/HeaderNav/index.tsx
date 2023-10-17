import React from "react";
import style from "./headerNav.module.css";
import { TextField } from "@/atoms";
import SearchIcon from "@/Vectors/search";
import clsx from "clsx";

const HeaderNav = () => {
  return (
    <div className={clsx("container", style.navHeader)}>
      <div className={style.textContent}>
        <p className={style.welcomeUser}>
          Welcome, <span>Alex 👋🏼</span>
        </p>
        <p className={style.userRole}>Super Admin</p>
      </div>

      <div className={style.inputWrapper}>
        <TextField startIcon={<SearchIcon />} />
      </div>
    </div>
  );
};

export default HeaderNav;
