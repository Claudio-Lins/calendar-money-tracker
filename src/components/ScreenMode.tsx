"use client";

import React, { useEffect } from "react";
import { fullScreen, exitFullScreen } from "../functions/fullScreen";
import { Expand, Shrink } from "lucide-react";

export function ScreenMode() {
  const [screenMode, setScreenMode] = React.useState(true);
  const toggleScreenMode = () => {
    setScreenMode(!screenMode);
    if (screenMode) {
      fullScreen();
    } else {
      exitFullScreen();
    }
  };

  return (
    <button className="" onClick={toggleScreenMode}>
      {!screenMode ? <Shrink size={14} /> : <Expand size={14} />}
    </button>
  );
}
