import React, { useEffect } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import BlogListItem from "./BlogListItem";
import NextLink from "next/link";

export default function BlogList({ postList, showCategory }) {

  const popularPosts = [];

  return (
    <>
      <div className="-mb-8">
      <NextLink
            prefetch={false}
            href="category/all"
          >
            <a>
              <LeftAccentedH2Text text="Latest" />
            </a>
          </NextLink>
      </div>

      <div className="flex flex-wrap -mx-3 overflow-hidden ">
        {postList &&
          postList?.nodes?.map((post, i) => (
           

            <div
              key={i}
              className="my-1 px-1 md:w-full overflow-hidden lg:w-1/3 xl:w-1/3"
            >
              <BlogListItem showCategory={showCategory} post={post} isFullWidth={true} />
            </div>
          ))}
      </div>
    </>
  );
}
