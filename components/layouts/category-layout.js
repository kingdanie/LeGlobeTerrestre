import React from "react";
import VerticalAddSpot from "../shared/ads/VerticalAddSpot";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

export default function CategoryListLayout({ children, title, footerMenus }) {
  return (
    <>
      <Header menuData={footerMenus} showAdSpace={false} />
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
      <Footer data={footerMenus} />
    </>
  );
}
