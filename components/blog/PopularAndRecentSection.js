import React, { useEffect, useState } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import BlogHeroItem from "./BlogHeroItem";
import BlogListItem from "./BlogListItem";
import BlogSmallItem from "./BlogSmallItem";
import NextLink from "next/link";

export default function PopularAndRecent({ posts, title, categorySlug }) {
  const [hightLightPost, setHightLightPost] = useState({});

  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      const nodes = posts?.nodes || [];
      const postItems = [...nodes];
      const firstPost = postItems.shift();

      setHightLightPost(firstPost);
      setOtherPosts(postItems);
    }
  }, []);

  return (
    <div>
      <NextLink
        prefetch={false}
        href={categorySlug ? `/category/${categorySlug}` : "#"}
      >
        <a>
          <LeftAccentedH2Text text={title || ""} isCapitalize />
        </a>
      </NextLink>
      <div className="w-full flex  flex-col md:flex-row  justify-between md:space-x-6">
        <div className="w-full md:w-3/5 flex flex-col">
          <BlogHeroItem post={hightLightPost || {}} />
        </div>

        <div className="w-full md:w-2/5 md:flex  flex-row md:flex-col md:justify-between ">
          {otherPosts && otherPosts.length > 0 ? (
            otherPosts.map((post, i) => <BlogSmallItem post={post} key={i} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
