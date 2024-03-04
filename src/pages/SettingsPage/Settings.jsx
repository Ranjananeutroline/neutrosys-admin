import React from "react";
import Service from "../../components/Settings/Service";
import BhoursC from "../../components/Settings/BHoursC";
import { AppProvider } from "../../AppContext";
import "./Settings.css"

const Settings = () => {
  return (
    <AppProvider>
      <div className="px-[50px] md:px-10 settings-main">
      <h1 className="text-[27px] text-[#3F26A5] pb-3">Settings</h1>
      <div className="set-main2">
          <BhoursC />
          <Service/>
          
      </div>
    </div>
    </AppProvider>
  );
};

export default Settings;
