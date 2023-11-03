import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import styles from "./tabs.module.css";

export type TabsProps = {
  tabs: { title: string; component: React.ReactNode }[];
  onChange?: (index: number) => void;
  defaultTab?: number;
};

const Tabs = ({ tabs, onChange, defaultTab = 0 }: TabsProps) => {
  const conditionalOnChange = onChange ? { onChange } : {};

  return (
    <Tab.Group {...conditionalOnChange} defaultIndex={defaultTab}>
      <Tab.List className={styles.tablist}>
        {tabs.map((tab) => (
          <Tab key={tab.title} className={styles.tab}>
            {tab.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.title} className={styles.tabPanel}>
            {tab.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
