import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const logoImageUrl = process.env["NEXT_PUBLIC_HEADER_LOGO"];

export default function Footer({ data }) {
  const { footerMenus, subDomains } = data || {};

  const { pathname } = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [domainMenu, setDomainMenu] = useState([]);

  const prefixPath = (path) => {
    if (pathname.includes("category")) {
      return path;
    } else {
      return `/category/${path}`;
    }
  };

  useEffect(() => {
    if (data && footerMenus) {
      const { edges } = footerMenus;

      const items = edges?.map((item) => {
        const {
          node: { label, path = "" },
        } = item;

        const paths = path
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

      setMenuItems(items);
      setDomainMenu(subDomains)
    }
  }, [data]);

  return (
    <div className="bg-footer-color mt-4 w-full flex flex-col text-center items-center justify-center py-12">
      <div className="relative flex flex-col space-y-6 items-center  container mx-auto">
        <div className="w-full flex justify-evenly flex-col md:flex-row">
          {menuItems.map((menu, i) => (
            <div
              key={i}
              className={`h-8 flex w-full text-center justify-center items-center ${
                i == menuItems.length - 1
                  ? "border-transparent "
                  : "border-accent-color "
              } md:border-r-2 `}
            >
              <NextLink prefetch={false} href={`${menu?.path || ""}`}>
                <a className=" text-white uppercase font-bold  border-transparent hover:text-accent-color">
                  {menu?.label}
                </a>
              </NextLink>
            </div>
          ))}
        </div>
               {/* SUBDOMAIN LINKS */}
               <div className="w-full flex justify-evenly flex-col md:flex-row">
          {domainMenu.map((domainItem) => (
            <div
              className={`h-8 mb-10 text-accent-color hover:underline hover:text-accent-color/60 text-sm flex w-full text-center justify-center items-center `}
              key={domainItem.id}
            >
              <NextLink
                prefetch={false}
                target="_blank"
                href={ `/${domainItem.slug}`}
              >
                {domainItem.title}
              </NextLink>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <img className="w-36 " src={`/${logoImageUrl}`} alt="logo" />
        </div>
      </div>
    </div>
  );
}
