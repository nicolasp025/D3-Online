import type React from "react";
import "./TabDisplayer.css";
import { useState } from "react";

export type TabItem = {
  id: number;
  title: string;
  content: React.ReactNode;
};

interface TabDisplayerProps {
  tabs: TabItem[];
}

export const TabDisplayer: React.FC<TabDisplayerProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  if (tabs.length == 0) return <></>;

  return (
    <div className="tab-container">
      <div className="tab-items">
        {tabs.map((tab: TabItem) => (
          <div
            key={`tab-${tab.title}`}
            className={
              tab.title === selectedTab.title ? "tab-item selected" : "tab-item"
            }
            onClick={() => {
              setSelectedTab(tab);
            }}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">{selectedTab.content}</div>
    </div>
  );
};
