"use client";

import React, { Suspense } from "react";
import Navigation from "./Navigation";
import HeaderNav from "./HeaderNav";
import styles from "./layout.module.css";
import { use100vh } from "react-div-100vh";
import MobileNav from "./Navigation/MobileNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const height = use100vh() || "100vh";
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div style={{ height }} className={styles.main}>
        <MobileNav />
        <HeaderNav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
