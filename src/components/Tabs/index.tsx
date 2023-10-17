import React from "react";
import {
  Tabs as RUITabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@reach/tabs";
import "@reach/tabs/styles.css";
import styles from "./tabs.module.css";

export type TabsProps = {
  tabs: { title: string; component: React.ReactNode }[];
};

const Tabs = ({ tabs }: TabsProps) => {
  return (
    <RUITabs>
      <TabList className={styles.tablist}>
        {tabs.map((tab) => (
          <Tab key={tab.title} className={styles.tab}>
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.title}>{tab.component}</TabPanel>
        ))}
      </TabPanels>
    </RUITabs>
  );
};

export default Tabs;
