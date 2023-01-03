import React from "react";
import VerticalAddSpot from "../shared/ads/VerticalAddSpot";
import SubDomainFooter from "../shared/SubDomainFooter";
import DomainHeader from "../shared/DomainHeader";

export default function DomainLayout({ children, title, footerMenus }) {
  // const { subDomains } =  footerMenus
  // console.log('what happend to ', footerMenus)
  return (
    <>
      <DomainHeader name={title} menuData={footerMenus} showAdSpace={false} />
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
      <SubDomainFooter name={title} data={footerMenus} />
    </>
  );
}
