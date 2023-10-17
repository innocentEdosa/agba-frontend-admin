import React from "react";
import style from "./navigation.module.css";
import Logo from "@/atoms/Logo";
import { CloseIcon, HamburgerIcon } from "@/Vectors";
import clsx from "clsx";
import { navigation } from "@/constants/navigation";
import NavLinkButton from "@/atoms/NavLinkButton";
import { use100vh } from "react-div-100vh";

const MobileNav = () => {
  const height = use100vh() || "100vh";
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={style.mobileNavWrapper}>
      <div className={clsx("container", style.topBar)}>
        <Logo />
        <button
          className={style.sidebarToggleBtn}
          onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? <CloseIcon fill="white" /> : <HamburgerIcon />}
        </button>
      </div>
      <div
        style={{ height }}
        className={clsx(style.sideBar, { [style.sideBarOpen]: isOpen })}>
        <nav className={style.mobileNav}>
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
      </div>
    </div>
  );
};

export default MobileNav;
