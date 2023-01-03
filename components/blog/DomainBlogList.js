import React, { useEffect } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import DomainListItem from "./DomainListItem";

export default function DomainBlogList({ postList, name }) {

  const popularPosts = [];

  return (
    <>
      <div className="-mb-8">
        <LeftAccentedH2Text text="Latest" />
      </div>

      <div className="flex flex-wrap -mx-3 overflow-hidden ">
        {postList &&
          postList?.nodes?.map((post, i) => (
           

            <div
              key={post.id}
              className="my-1 px-1 md:w-full overflow-hidden lg:w-1/3 xl:w-1/3"
            >
              <DomainListItem name={name} post={post} isFullWidth={true} />
            </div>
          ))}
      </div>
    </>
  );
}
