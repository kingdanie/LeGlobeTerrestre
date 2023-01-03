import React, { useEffect, useState } from "react";
import NextLink from "next/link";


export default function DomainHeroSection({ data, post = {} }) {
  const { headerMenus, dubaiMenus, name } = data || {};
  // console.log(`=====dubaiMenus======`, dubaiMenus)
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    if (data ) {

      const { nodes } = dubaiMenus;

      const items = dubaiMenus?.map((item) => {
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
              ? paths[paths.length - 1]
              : "#",
        };
      });

      setMenuItems(items);
    }
  }, []);

  const MainMenu = [
    { label: 'ACCOMMODATIONS', path: `${name}/category/accommodations-${name}` },
    { label: 'ATTRACTIONS', path: `${name}/category/attractions-${name}` },
    { label: 'DRINK', path: `${name}/category/drink-${name}` },
    { label: 'EAT', path: `${name}/category/eat-${name}` },
    { label: 'TIPS', path: `${name}/category/tips-${name}` },
    { label: 'TOURS & EVENTS', path: `${name}/category/tours-events-${name}` }
  ]

  return (
    <div className="relative bg-white overflow-hidden">
      <div
        className="w-screen h-96 bg-accent-color relative object-fit bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(201,73,44,0.8)),url('${
            post
              ? post?.featuredImage?.node?.mediaItemUrl
              : ""
          }')`,
        }}
      >
        <div className="w-full h-full flex items-end p-12">
          <div className="container mx-auto flex flex-col">
            <NextLink prefetch={false} href={post?.slug ? post?.slug : '#'}>
              <div className="w-full">
                <h1 className="text-2xl md:text-4xl line-clamp-3 uppercase text-white font-extrabold ">
                  {post ? post?.title : ""}
                </h1>
              </div>
            </NextLink>
            <p className=" text-white text-lg capitalize  mt-2 font-bold">
              {post?.author?.node?.name || "Editorial Team"}
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full py-6 px-8 bg-gray-100 hidden sm:block">
        <nav className="relative flex-col items-center container mx-auto">
   
          <div className="w-full flex justify-evenly flex-col md:flex-row">
             {/* {menuItems.map((menu, i) => (
              <div
                className={`h-8 flex w-full text-center justify-center items-center ${
                  i == menuItems.length - 1
                    ? "border-transparent "
                    : "border-accent-color "
                } md:border-r-2 `}
                key={i}
              >
                <NextLink
                  prefetch={false}
                  href={`category/${menu?.path || ""}`}
                >
                  <div className=" text-black uppercase font-bold  border-transparent hover:text-accent-color">
                    {menu?.label}
                  </div>
                </NextLink>
              </div>
            ))}  */}
               {MainMenu.map((menu, i) => (
              <div
                className={`h-8 flex cursor-pointer w-full text-center justify-center items-center ${
                  i == MainMenu.length - 1
                    ? "border-transparent "
                    : "border-accent-color "
                } md:border-r-2 `}
                key={i}
              >
                <NextLink
                  prefetch={false}
                  href={`${menu?.path || ""}`}
                >
                  <div className=" text-black uppercase font-bold  border-transparent hover:text-accent-color">
                    {menu?.label}
                  </div>
                </NextLink>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
