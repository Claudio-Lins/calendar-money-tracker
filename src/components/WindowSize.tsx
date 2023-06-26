"use client";
import { useState, useEffect } from "react";
import { useWindowSize } from "@claudiolins-dev/claudiolins-lib";

export function WindowSize() {
  return (
    <div>
      <h1>Window Size: {useWindowSize().width}</h1>
    </div>
  );
}
