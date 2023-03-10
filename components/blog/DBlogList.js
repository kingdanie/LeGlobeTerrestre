import React, { useEffect } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import DBlogListItem from "./DBlogListItem";
import NextLink from "next/link";

export default function DBlogList({ postList, name, showTitle = true }) {

  const popularPosts = [];

  return (
    <>
    {showTitle &&
      <div className="-mb-8">
          <NextLink
            prefetch={false}
            href={name ? `${name}/category/all` : "#"}
          >
            <a>
              <LeftAccentedH2Text text="Latest" />
            </a>
          </NextLink>
      </div>}

      <div className="flex flex-wrap -mx-3 overflow-hidden ">
        {postList &&
          postList?.nodes?.map((post, i) => (
           

            <div
              key={i}
              className="my-1 px-1 md:w-full overflow-hidden lg:w-1/3 xl:w-1/3"
            >
              <DBlogListItem name={name} post={post} isFullWidth={true} />
            </div>
          ))}
      </div>
    </>
  );
}
