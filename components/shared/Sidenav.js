import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useSideMenu } from "../../lib/side-menu-hook";

const logoImageUrl = process.env["NEXT_PUBLIC_SIDENAV_LOGO"];

export default function Sidenav({ menuData }) {
  const { isNavOpen, setNavOpenState } = useSideMenu();

  const router = useRouter();

  const { headerMenus } = menuData || {};

  const { pathname } = useRouter();

  const closeNavbar = () => {
    // setMenuOpen(false);
    setNavOpenState(false);
  };

  const handleNavigation = (url) => {
    router.push(url);
    closeNavbar();
  };

  const [menuItems, setMenuItems] = useState([]);

  const prefixPath = (path) => {
    if (pathname.includes("category")) {
      return path;
    } else {
      return `/category/${path}`;
    }
  };

  useEffect(() => {
    if (menuData && headerMenus) {
      const { edges } = headerMenus;

      const items = edges?.map((item) => {
        const {
          node: { label, path = "" },
        } = item;

        let paths = path
          .trim()
          .split("/")
          .filter((x) => x && x.length > 0);
        return {
          label: label || "",
          path:
            paths && paths.length > 0
              ? prefixPath(paths[paths.length - 1])
              : "#",
        };
      });

      items.unshift({
        label: "All",
        path: prefixPath("all"),
      });

      setMenuItems(items);
    }
  }, [menuData]);

  return (
    //
    <div
      id="side-nav"
      className={`absolute h-screen w-screen top-0 left-0 flex ${
        isNavOpen ? "navbar-open" : "navbar-close"
      }`}
    >
      <div className="w-full lg:w-1/4 bg-white h-full">
        <div className="container mx-auto  px-4">
          <div className="flex justify-between items-center my-4">
            <img src={`/${logoImageUrl}`} alt="logo" className="h-20" />
            <span
              className={`text-black h-10 w-10 cursor-pointer`}
              onClick={closeNavbar}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <hr />
          <div className="w-full flex space-y-5 flex-col my-4">
            {menuItems.map((menu, i) => (
              <div key={i} className={`flex w-full`}>
                <a
                  // href={`${menu?.path || ""}`}
                  onClick={() => handleNavigation(`${menu?.path || ""}`)}
                  className="cursor-pointer text-black uppercase font-bold  border-transparent hover:text-accent-color"
                >
                  {menu?.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        onClick={closeNavbar}
        className="w-0 md:w-3/4 h-full bg-black opacity-50"
      ></div>
    </div>
  );
}
