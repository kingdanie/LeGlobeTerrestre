import React, { useEffect, useState } from "react";
import VerticalAddSpot from "../shared/ads/VerticalAddSpot";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import SocialShareIcons from "../shared/SocialShareIcons";
import NextImage from "next/image";
import { handlePlaceholderImageIfNeeded, sanitize } from "../../lib/utils";
import Seo from "../shared/SEO";
import Head from "next/head";
export default function PostLayout({
  children,
  title,
  featuredImage,
  footerMenus,
  seoData,
  isScrollSidebar,
}) {
  // console.log(`seoData ---<`, seoData);
  // console.log(`sanitize(seoData?.seo.schemaDetails) ---<`, sanitize(seoData?.seo.schemaDetails));

  const [scrollSidebar, setSideBarScroll] = useState(false);

  console.log(`isScrollSidebar -->`, isScrollSidebar);

  useEffect(() => {
    setSideBarScroll(isScrollSidebar);
  }, [isScrollSidebar]);

  return (
    <>
      <Header menuData={footerMenus} showAdSpace={false} />
      <main className="md:-mt-4">
        <div className="relative bg-white overflow-hidden">
          <div className="w-screen h-96 sm:h-72 md:h-96  relative">
            <div className="lg:aspect-w-16 lg:aspect-h-9">
              <NextImage
                layout="fill"
                objectFit="cover"
                src={handlePlaceholderImageIfNeeded(featuredImage)}
                alt={`Featured Image for ${title}`}
              />
            </div>

            <div
              className="absolute top-0 right-0 bottom-0 left-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(201,73,44,0.7))",
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap overflow-hidden ">
          <div className="hidden sm:block my-4 px-4 w-1/4 overflow-hidden relative">
            <div
              className={`${
                scrollSidebar ? "sm:relative" : "sm:fixed sm:top-0"
              }`}
              style={{ height: "calc(100% - 250px)" }}
            >
              <div className="flex flex-col p-4 space-y-4 relative">
                <SocialShareIcons
                  url={process?.browser?.window?.location?.href}
                  title={title || ""}
                />

                <VerticalAddSpot />
              </div>
            </div>
          </div>
          <div className="my-4 px-4 w-full sm:w-3/4 overflow-hidden">{children}</div>
        </div>
      </main>
      <Footer data={footerMenus} />
    </>
  );
}
