"use client";

import { TabItem } from "@/app/types/TabProps";
import { useState } from "react";

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: number | string;
}

export default function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0].id);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div>
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-2 rounded-t-md transition-all duration-200 font-medium ${
                isActive
                  ? "bg-main-color text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="p-4 border bg-gray-100 rounded-b-md rounded-e-md">
        {activeTab?.content}
      </div>
    </div>
  );
}
