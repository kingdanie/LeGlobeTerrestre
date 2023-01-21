import Link from "next/link";
import React, { useEffect } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import DomainListItem from "./DomainListItem";

export default function DomainList({ name, postList, showCategory }) {

  return (
    <>
      <div className="-mb-8">
      <Link prefetch={false} href={name.toLowerCase()}>
          <a>
            <LeftAccentedH2Text text={name} isCapitalize />
          </a>
        </Link>
      </div>

      <div className="flex flex-wrap -mx-3 overflow-hidden ">
        {postList &&
          postList?.nodes?.map((post, i) => (
           

            <div
              key={post.id}
              className="my-1 px-1 md:w-full overflow-hidden lg:w-1/3 xl:w-1/3"
            >
              <DomainListItem showCategory={showCategory} name={name} post={post} isFullWidth={true} showText={false} />
            </div>
          ))}
      </div>
    </>
  );
}
