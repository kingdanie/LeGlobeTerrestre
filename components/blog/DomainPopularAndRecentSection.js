import React, { useEffect, useState } from "react";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import DomainBlogHeroItem from "./DomainBlogHeroItem";
import BlogListItem from "./BlogListItem";
import DomainBlogSmallItem from "./DomainBlogSmallItem";
import NextLink from "next/link";
export default function DomainPopularAndRecent({
  posts,
  title,
  categorySlug,
  name
}) {
  const [hightLightPost, setHightLightPost] = useState({});

  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      const nodes = posts?.nodes || [];
      const postItems = [...nodes];
      const firstPost = postItems.shift();
      // console.log('postItems code', postItems)
      setHightLightPost(firstPost);
      setOtherPosts(postItems);
    }
  }, []);

  const nodes = posts?.nodes || [];
  const IpostItems = [...nodes];
  const IfirstPost = IpostItems.shift();


  return (
    <div>
      <NextLink
        prefetch={false}
        href={
          categorySlug ? `${name}/category/${categorySlug}` : "#"
        }
      >
        <div>
          <LeftAccentedH2Text
            text={title || ""}
            isCapitalize
          />
        </div>
      </NextLink>
      <div className="w-full flex  flex-col md:flex-row  justify-between md:space-x-6">
        {/* <div className="w-full md:w-3/5 flex flex-col">
          <BlogHeroItem post={hightLightPost || {}} />
        </div> */}

        <div className="w-full md:w-3/5 flex flex-col">
          <DomainBlogHeroItem name={name} post={IfirstPost || {}} />
        </div>
        <div className="w-full md:w-2/5 md:flex  flex-row md:flex-col md:justify-between ">
          {IpostItems && IpostItems.length > 0 ? (
            IpostItems.map((post, i) => (
              <div key={i}>
                <DomainBlogSmallItem name={name} post={post} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* <div className="w-full md:w-2/5 md:flex  flex-row md:flex-col md:justify-between ">
          {otherPosts && otherPosts.length > 0 ? (
            otherPosts.map((post, i) => <div key={i}><BlogSmallItem post={post}  /></div>)
          ) : (
            <></>
          )}
        </div> */}
      </div>
    </div>
  );
}
