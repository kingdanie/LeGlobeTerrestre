import React from "react";
import VerticalAddSpot from "../shared/ads/VerticalAddSpot";
import DFooter from "../shared/DFooter";
import DHeader from "../shared/DHeader";

export default function DCategoryListLayout({ children, title, footerMenus }) {
  return (
    <>
      <DHeader menuData={footerMenus} showAdSpace={false} />
      <main className="md:-mt-4">
        <div className="flex flex-wrap overflow-hidden ">
          <div className="w-full overflow-hidden md:w-1/4">
            <div className="flex flex-col p-4 space-y-4">
             
              <VerticalAddSpot />
              <VerticalAddSpot />
              <VerticalAddSpot />
            </div>
          </div>

          <div className="w-full overflow-hidden md:w-3/4 px-4">{children}</div>
        </div>
      </main>
      <DFooter data={footerMenus} />
    </>
  );
}
