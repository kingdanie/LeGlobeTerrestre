import React from "react";

export default function AccentHorizontalBar({ w }) {
  return <div className={`h-2 bg-accent-color ${w ? w : "w-full"}`}></div>;
}
