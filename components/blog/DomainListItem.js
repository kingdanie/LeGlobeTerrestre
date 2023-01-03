import React, { useEffect, useState } from "react";
import {
  handlePlaceholderImageIfNeeded,
  sanitize,
  truncateExcerpt,
} from "../../lib/utils";
import NextLink from "next/link";
import NextImage from "next/image";

export default function DomainListItem({
  post,
  name,
  showCategory = true,
  isFullWidth,
  showText = true,
}) {
  const [category, setCategory] = useState(null);
  const getCategory = (categories) => {
    let categoryItems = categories?.nodes?.map((x) => ({
      name: x?.name,
      slug: x?.slug,
    }));
    setCategory(categoryItems[0]);
  };

  useEffect(() => {
    if (post && post["categories"]) {
      getCategory(post["categories"]);
    }
  }, []);

  return (
    <div
      className={`w-full ${
        isFullWidth ? "w-full" : "sm:w-1/3"
      } ml-1 p-1 cursor-pointer mt-4 sm:mt-8`}
    >
      <NextLink prefetch={false} href={`${name}/${post?.slug}` || "#"}>
        <div className="w-full realative">
          <div className="aspect-w-16 aspect-h-9 relative">
            <NextImage
              layout="fill"
              object-fit="cover"
              src={handlePlaceholderImageIfNeeded(
                post?.featuredImage?.node?.mediaItemUrl
              )}
              alt={`Cover Image for ${post?.title}`}
            />
          </div>
          <h5 className="mt-6 line-clamp-2 md:h-14 max-h-16 text-xl font-bold transition duration-300 group-hover:text-primary-500 hover:text-accent-color">
            {post?.title}
          </h5>
        </div>
      </NextLink>
      {showText && <div
        className="mt-2 line-clamp-3  text-secondary-100 leading-loose text-sm"
        dangerouslySetInnerHTML={{
          __html: truncateExcerpt(post?.excerpt),
        }}
      ></div>}
      <div className="mt-4">
        {showCategory && category && (
          <NextLink
            prefetch={false}
            href={`${name}/category/${category?.slug || ""}`}
          >
            <div className=" h-full flex items-center font-light text-black uppercase  pl-3 border-l-2 border-accent-color">
              {category?.name}
            </div>
          </NextLink>
        )}
      </div>
    </div>
  );
}
