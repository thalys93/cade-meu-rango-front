import { useEffect, useState } from "react"

export function homeUtils() {
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const savedTab = localStorage.getItem('defaultActiveKey');

    if (savedTab) {
      setActiveTab(savedTab);
    }

  }, []);

  const tabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    localStorage.setItem('defaultActiveKey', selectedTab);
  };

  
  return {activeTab, tabSelect}
}