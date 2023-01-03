import React, { useEffect, useState } from "react";
import NextLink from "next/link";

const MainMenu = [
  { label: 'ACCOMMODATIONS', path: '/category/accommodations' },
  { label: 'ATTRACTIONS', path: '/category/attractions' },
  { label: 'DRINK', path: '/category/drink' },
  { label: 'EAT', path: '/category/eat' },
  { label: 'TIPS', path: '/category/tips' },
  { label: 'TOURS & EVENTS', path: '/category/tours-events' }
]

export default function SubHeroSection({ domainName }) {

// export default function SubHeroSection({ domainName, data, post = {} }) {
  // const { headerMenus } = data || {};
  // const [menuItems, setMenuItems] = useState([]);
  // useEffect(() => {
  //   if (data ) {
  //     const { edges } = headerMenus;

  //     const items = edges?.map((item) => {
  //       const {
  //         node: { label, path = "" },
  //       } = item;

  //       const paths = path
  //         .trim()
  //         .split("/")
  //         .filter((x) => x && x.length > 0);

  //       return {
  //         label: label || "",
  //         path:
  //           paths && paths.length > 0
  //             ? paths[paths.length - 1]
  //             : "#",
  //       };
  //     });

  //     setMenuItems(items);
  //   }
  // }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* <div
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
            <NextLink prefetch={false} href={post?.slug}>
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
      </div> */}
      <div className="relative w-full py-6 px-8 bg-red-100 hidden sm:block">
        <nav className="relative flex-col items-center container mx-auto">
   
          <div className="w-full flex justify-evenly flex-col md:flex-row">
           
               {MainMenu.map((menu, i) => (
              <div
                className={`h-8 flex w-full text-center justify-center items-center
                    border-accent-color 
                 md:border-r-2 `}
                key={i}
              >
                <NextLink
                  prefetch={false}
                  href={`${domainName}/${menu.path}`}
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
