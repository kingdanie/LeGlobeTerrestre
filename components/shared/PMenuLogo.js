import React from "react";
import NextLink from "next/link";
import DSidenav from "./DSidenav";
import { useSideMenu } from "../../lib/side-menu-hook";

const whiteLogoImageUrl = process.env["NEXT_PUBLIC_FOOTER_LOGO"];

export default function PMenuLogo({ showMenuTrigger, menuData }) {
  const { isNavOpen, setNavOpenState } = useSideMenu();

  return (
    <>
      <DSidenav setNavOpenState={setNavOpenState} menuData={menuData || {}} />

      <div className="flex items-center justify-center">
        <span
          onClick={() => setNavOpenState(!isNavOpen)}
          className={`${
            showMenuTrigger ? "inline-block" : "hidden"
          } text-white h-6 w-6 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>

        <NextLink prefetch={false} href={`/${menuData.name}`}>
          <a>
            <img className="w-36 " src={`/${whiteLogoImageUrl}`} alt="logo" />
          </a>
        </NextLink>
      </div>
    </>
  );
}
