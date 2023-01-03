import React from "react";

export default function LeftAccentedH2Text({ text, isCapitalize }) {
  return (
    <div className="flex flex-row items-center mb-4">
      <span className="h-full  bg-accent-color">&nbsp;</span>
      <h2
        className={`font-semibold text-2xl block  ml-2 ${
          isCapitalize ? "capitalize" : ""
        }`}
      >
        {text}
      </h2>
    </div>
  );
}
