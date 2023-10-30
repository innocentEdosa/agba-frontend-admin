import React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import styles from "./dropdownMenu.module.css";

export enum DropdownMenuPosition {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export enum DropdownMenuAllignment {
  Center = "center",
  Start = "start",
  End = "end",
}

export type DropdownMenuProps = {
  toggler: React.ReactNode;
  children: React.ReactNode;
  side?: DropdownMenuPosition.Bottom;
  align?: DropdownMenuAllignment;
  dropdownItemAschild?: boolean;
  clasName?: string;
};

const DropdownMenu = ({
  toggler,
  children,
  side = DropdownMenuPosition.Bottom,
  align = DropdownMenuAllignment.End,
  dropdownItemAschild = false,
  clasName = "",
}: DropdownMenuProps) => {
  return (
    <div className={clasName}>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>{toggler}</Dropdown.Trigger>
        {/* <Dropdown.Portal> */}
          <Dropdown.Content
            side={side}
            align={align}
            className={styles.DropdownMenuContent}
            sideOffset={5}>
            {React.Children.map(children, (child) => (
              <Dropdown.Item
                className={styles.DropdownMenuItem}
                asChild={dropdownItemAschild}>
                {child}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        {/* </Dropdown.Portal> */}
      </Dropdown.Root>
    </div>
  );
};

export default DropdownMenu;
