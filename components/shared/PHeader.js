import React from "react";
import dynamic from "next/dynamic";
import PMenuLogo from "./PMenuLogo";
const HorizontalAdSpot = dynamic(() => import("./ads/HorizontalAdSpot"), {
  ssr: false,
});

export default function PHeader({
  showAdSpace,
  isAbsolute,
  menuData,
  fixedHeight,
}) {
  return (
    <div
      className={`${
        isAbsolute ? "md:absolute" : ""
      } relative  top-0 w-full z-30 h-full ${fixedHeight ? "md:h-28" : ""}`}
    >
      <div
        className={`w-full flex flex-col md:flex-row justify-between ${
          !isAbsolute ? "bg-accent-color" : "bg-accent-color md:bg-transparent "
        }`}
      >
        <div
          className={`flex p-4 mx-auto justify-between w-full ${
            !showAdSpace ? "md:w-full" : "md:w-1/4"
          }`}
        >
          <PMenuLogo menuData={menuData} showMenuTrigger={true} />
        </div>

        {showAdSpace && <HorizontalAdSpot />}
      </div>
    </div>
  );
}
