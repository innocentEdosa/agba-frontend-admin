import NavLinkButton from "@/atoms/NavLinkButton";
import { navigation } from "@/constants/navigation";
import React from "react";
import style from "./navigation.module.css";
import { use100vh } from "react-div-100vh";
import Logo from "@/atoms/Logo";

const Navigation = () => {
  const height = use100vh() || "100vh";
  return (
    <nav style={{ height: height }} className={style.nav}>
      <div>
        <Logo />
      </div>
      <ul className={style.navLinksWrapper}>
        {navigation.map((item) => {
          return (
            <li className={style.navLinkItem} key={item.path}>
              <NavLinkButton
                href={item.path}
                text={item.name}
                icon={item.icon}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
